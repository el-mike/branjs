import { Type } from '../../models';

import {
  TreeNode,
  Tree,
} from '../../structs';

import { View } from '../view';

import {
  TemplateASTBinding,
  TemplateASTDirective,
  TemplateASTNode,
  Parser,
} from '../parser';

import {
  ComponentsRegistry,
  ComponentFactory
} from '../component';

import {
  DirectiveType,
  Directive,
  isIfDirective,
  IfDirective,
} from '../directive';

import {
  Binding
} from '../models';

import { ViewNode } from '../view-node';
import { ViewRef } from '../view-ref';

export class Compiler {
  private static _instance: Compiler;

  private constructor(
    private readonly _parser: Parser,
    private readonly _componentFactory: ComponentFactory,
    private readonly _componentsRegistry: ComponentsRegistry,
  ) {}

  public static getInstance(
    parser: Parser,
    componentFactory: ComponentFactory,
    componentsRegistry: ComponentsRegistry,
  ) {
    if (!Compiler._instance) {
      Compiler._instance = new Compiler(parser, componentFactory, componentsRegistry);
    }

    return Compiler._instance;
  }

  public compile<T>(component: Type<T>, host: HTMLElement) {
    return this._compileViewRef(component, host);
  }

  /**
   * Compiles ViewRef and descendants recursively, and returns the root ViewRef.
   */
  private _compileViewRef<T>(
    component: Type<T>,
    host: HTMLElement,
    viewRefTree: Tree<ViewRef> = null,
    parentViewRef: ViewRef = null,
    hostViewNode: TreeNode<ViewNode> = null,
  ) {
    const componentRef = this._componentFactory.create(component, host);

    /**
     * Get Abstract Syntax Tree for given component's template.
     * Child components won't be included, as they are not the concern
     * of the given ViewRef.
     * Child components are not even resolved at this point.
     * 
     * Root of this AST is the host element, which in case of entryComponent
     * is the hostElement passed while bootstrapping the view.
     */
    const ast = this._parser.parse(componentRef.template, host);

    /**
     * Get ViewNode Tree for given ViewRef.
     * The root ViewNode is related to the ViewRef's hostElement.
     */
    const nodesTree = this._getViewNodes(ast.root);

    const viewRef = new ViewRef(componentRef, nodesTree);

    if (!viewRefTree && !parentViewRef) {
      viewRefTree = new Tree<ViewRef>(viewRef);
    } else {
      viewRefTree.add(viewRef, parentViewRef);
    }

    if (hostViewNode) {
      hostViewNode.data.viewRef = viewRef;
    }

    /**
     * Traverse the newly created ViewRef's ViewNode Tree and search for
     * child components. Every time component selector is found, the compiler
     * is being fired in order to create a child ViewRef.
     * 
     * Since AST includes hostElement as well, we need to omit root ViewNode,
     * otherwise it will fall into infinitive loop - element for which we are trying to
     * create a new ViewRef is it's root ViewNode.
     * 
     * Afterwards, ViewRef instance is being assigned to the related ViewNode,
     * allowing parent to interact with the child ViewNode at any time.
     * Also, this allow ViewRef to be aware of it's host ViewNode.
     */
    viewRef.nodesTree.traverseDF(viewNode => {
      if (!viewNode.isRoot && viewNode.data.componentSelector) {
        // const childViewRef = this._compileViewRef(
        this._compileViewRef(  
          this._componentsRegistry.getBySelector(viewNode.data.componentSelector),
          viewNode.data.element,
          viewRefTree,
          viewRef,
          viewNode,
        );

        // viewNode.data.viewRef = childViewRef;
      }
    });

    viewRef.compiled = true;

    return viewRefTree;
  }

  /**
   * Returns ViewNode Tree for given TemplateASTNode. It does not compile or build
   * ViewNode Trees of it's children components, just saves component's selector on related
   * ViewNode for later use.
   */
  private _getViewNodes(
    astNode: TreeNode<TemplateASTNode>,
    parent: ViewNode = null,
    viewNodesTree: Tree<ViewNode> = null
  ) {
    const viewNode = this._buildViewNode(astNode.data);

    if (!viewNodesTree && !parent) {
      viewNodesTree = new Tree<ViewNode>(viewNode);
    } else {
      viewNodesTree.add(viewNode, parent);
    }

    astNode.children.forEach(childAstNode =>
      this._getViewNodes(childAstNode, viewNode, viewNodesTree)
    );

    return viewNodesTree;
  }

  private _buildViewNode(astNode: TemplateASTNode) {
    const viewNode = new ViewNode(astNode.element);

    viewNode.componentSelector = astNode.componentSelector;
    viewNode.bindings = astNode.bindings.map(binding => this._buildBinding(binding, viewNode));
    
    astNode.directives.forEach(directive => {
      viewNode.directives.set(directive.type, this._buildDirective(directive, viewNode));
    });

    return viewNode;
  }

  private _buildBinding(binding: TemplateASTBinding, viewNode: ViewNode) {
    return new Binding(viewNode, binding.propName, null);
  }

  private _buildDirective(directive: TemplateASTDirective, viewNode: ViewNode) {
    if (isIfDirective(directive)) {
      return new IfDirective(viewNode, directive.propName, null);
    }
  }
}
