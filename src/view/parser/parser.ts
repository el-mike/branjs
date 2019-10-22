import { Tree } from '../../structs';

import {
  TemplateASTNode,
  TemplateASTBinding,
} from './models';

import { PATTERNS } from './patterns';
import {
  INTERPOLATION_REGEXP,
  MATCH_NAMESPACE_REGEXP,
  IS_SELECTOR_REGEXP,
} from './reg-exp';

import { TemplateASTBindingTargetFactory } from './template-ast-binding-target.factory';

export class Parser {
  private static _instance: Parser;

  private constructor(
    private readonly _templateASTBindingTargetFactory: TemplateASTBindingTargetFactory,
  ) {}

  public static getInstance(
    templateASTBindingTargetFactory: TemplateASTBindingTargetFactory
  ) {
    if (!Parser._instance) {
      Parser._instance = new Parser(templateASTBindingTargetFactory);
    }

    return Parser._instance;
  }

  public parse(template: string, hostEl: HTMLElement) {
    const ctx = hostEl.cloneNode() as HTMLElement;

    /**
     * For the sake of simplicity, browser's do the hard part of parsing work.
     * It is the slowest possible solution though.
     */
    ctx.innerHTML = template;

    return this._parseElement(ctx);
  }

  private _parseElement(
    element: HTMLElement,
    parent: TemplateASTNode = null,
    astTree: Tree<TemplateASTNode> = null
  ) {
    const astNode = new TemplateASTNode(element);

    if (!astTree && !parent) {
      astTree = new Tree<TemplateASTNode>(astNode);
    } else {
      astNode.parentElement = parent.element;
      astTree.add(astNode, parent);
    }

    astNode.componentSelector = this._getComponentSelector(element);

    if (element.nodeType === Node.TEXT_NODE) {
      this._getInterpolationBindings(element)
        .forEach(binding => astNode.addBinding(binding));
    } else {
      this._getAttributeBindings(element)
        .forEach(binding => astNode.addBinding(binding));
    }

    astNode.element.childNodes
      .forEach(childNode => {
        if (childNode.nodeType !== Node.COMMENT_NODE) {
          this._parseElement(childNode as HTMLElement, astNode, astTree);
        }
      });

    return astTree;
  }

  private _getComponentSelector(element: HTMLElement) {
    if (element.nodeType === Node.TEXT_NODE) {
      return null;
    }

    return element.getAttribute(PATTERNS.SELECTOR) || null;
  }

  private _getAttributeBindings(element: HTMLElement) {
    if (element.nodeType === Node.TEXT_NODE) {
      return [];
    }

    return element
      .getAttributeNames()
      .filter(attributeName => MATCH_NAMESPACE_REGEXP.test(attributeName))
      .filter(attributeName => !IS_SELECTOR_REGEXP.test(attributeName))
      .map(attributeName => {
        const bindingTarget = this._templateASTBindingTargetFactory.create(attributeName);
        const expression = element.getAttribute(attributeName);

        return new TemplateASTBinding(
          element,
          bindingTarget,
          expression,
        );
      });
  }

  private _getInterpolationBindings(element: HTMLElement) {
    if (element.nodeType !== Node.TEXT_NODE) {
      return [];
    }

    const innerText = element.textContent;
    /**
     * Interpolation brackets themselves makes 4 characters already,
     * it does not make sense to create a binding when there is less than 5 characters
     * in the textContent property.
     */
    if (!innerText || innerText.length < 5) {
      return [];
    }

    return (innerText.match(INTERPOLATION_REGEXP) || [])
      .map(lexeme => {
        const bindingTarget = this._templateASTBindingTargetFactory.create(lexeme);
        const expression = lexeme
          .replace('{{', '')
          .replace('}}', '')
          .trim();

        return new TemplateASTBinding(
          element,
          bindingTarget,
          expression
        );
      });
  }
}
