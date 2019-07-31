import { isFunction } from '../../utils';

import { Tree } from '../../structs';

import { DirectiveType } from '../directive';

import {
  TemplateASTNode,
  TemplateASTBinding,
  TemplateASTDirective,
} from './models';

import { ATTRS } from './attributes';
import { INTERPOLATION_REGEXP } from './reg-exp';

export class Parser {
  private static _instance: Parser;

  private constructor(private documentRef: Document) {}

  public static getInstance(documentRef: Document = document) {
    if (!Parser._instance) {
      Parser._instance = new Parser(documentRef);
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
    const ifDirective = this._getIfDirective(element);

    if (ifDirective) {
      astNode.addDirective(ifDirective);
    }

    this._getBindings(element)
      .map(binding => astNode.addBinding(binding));

    astNode.element.childNodes.forEach(childNode => {
      this._parseElement(childNode as HTMLElement, astNode, astTree);
    });

    return astTree;
  }

  private _getComponentSelector(element: HTMLElement) {
    if (element.nodeType === Node.TEXT_NODE) {
      return null;
    }
    return element.getAttribute(ATTRS.SELECTOR) || null;
  }

  private _getIfDirective(element: HTMLElement) {
    if (element.nodeType === Node.TEXT_NODE) {
      return null;
    }

    const propName = element.getAttribute(ATTRS.IF);

    return propName
      ? new TemplateASTDirective(DirectiveType.IF, element, propName)
      : null;
  }

  private _getBindings(element: Node) {
    const innerText = element.textContent;

    if (!innerText || innerText.length < 5) {
      return [];
    }

    const bindingTokens = innerText.match(INTERPOLATION_REGEXP) || [];

    return bindingTokens.map(token => {
      const propName = token
        .replace('{{', '')
        .replace('}}', '');

      return new TemplateASTBinding(element, propName);
    });
  }
}
