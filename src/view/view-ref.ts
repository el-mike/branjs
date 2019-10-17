import {
  Tree,
  TreeNode,
} from '../structs';

import {
  isIfDirective,
} from './directive';

import { ComponentRef } from './component';

import { ViewNode } from './view-node';

export class ViewRef {
  private _renderHost: HTMLElement;

  private _pendingUpdate: boolean;

  public compiled = false;
  public initialized = false;
  public rendered = false;
  public destroyed = false;

  public get nodesTree() {
    return this._nodesTree;
  }

  constructor(
    private _componentRef: ComponentRef<any>,
    private _nodesTree: Tree<ViewNode>,
  ) {}

  public init() {
    this._componentRef.injector.addProvider({
      provide: ViewRef,
      useFactory: () => this,
    });

    this.initialized = true;
  }

  public updateRenderHost(host: HTMLElement) {
    this._renderHost = host;
  }

  public requestUpdate() {
    if (this._pendingUpdate) {
      return;
    }

    this.update();
    this.render();
  }

  /**
   * Traverse ViewRef's ViewNode Tree in order to update bindings
   * and directives.
   * For every ViewNode visted we are applying it's bindings and directives,
   * and afterwards we are checking for related ViewRef - if it exists, we are
   * calling it's update method.
   * 
   * ViewNode Tree of given ViewRef does not contains nodes of it's child ViewRefs -
   * those are handled by the child, after calling update() method on ViewNode with ViewRef
   * on it.
   * 
   */
  public update() {
    this._pendingUpdate = true;

    if (!this.initialized) {
      this.init();
    }

    if (!this._componentRef.initialized) {
      this._componentRef.init();
    }

    const componentInstance = this._componentRef.instance;

    this._nodesTree.traverseBF(treeNode => {
      /**
       * As ViewRef's root ViewNode is it's host ViewNode, we are skipping it - 
       * it has been already updated by this ViewRef's parent, as all of it's bindings
       * and directives are dependant on component of it's parent ViewRef.
       */
      if (treeNode.isRoot) {

        return;
      }

      const viewNode = treeNode.data;
      viewNode.directives.forEach(directive => {
        if (isIfDirective(directive)) {
          directive.updateValue(componentInstance[directive.propName]);
        }

        directive.run();

      });

      if (viewNode.viewRef && viewNode.active) {
        viewNode.viewRef.update();
      }
    });

    this._pendingUpdate = false;
  }

  public render() {
    this._renderNode(this.nodesTree.root);

    this.rendered = true;

    this.postRender();
  }

  public postRender() {
    this._componentRef.setupEventHandlers(this._renderHost);
  }

  private _renderNode(treeNode: TreeNode<ViewNode>, parentElement: Node = null) {
    const viewNode = treeNode.data;

    if (treeNode.isRoot) {
      this._clearHostElement(this._renderHost);
      this._renderChildNodes(treeNode, this._renderHost);
    } else {
      const viewNodeElement = viewNode.element.cloneNode() as HTMLElement;

      if (viewNode.active) {
        parentElement.appendChild(viewNodeElement);

        if (viewNode.viewRef) {
          /**
           * Each time child ViewRef is being rendered,
           * it's renderHost needs to be updated, as it's parent
           * already cloned the element ViewRef should be rendered in.
           */
          viewNode.viewRef.updateRenderHost(viewNodeElement);
          viewNode.viewRef.render();
        } else {
          this._renderChildNodes(treeNode, viewNodeElement);
        }
      }
    }
  }

  private _renderChildNodes(treeNode: TreeNode<ViewNode>, parentElement: Node = null) {
    treeNode.children.forEach(chidTreeNode => {
      this._renderNode(chidTreeNode, parentElement);
    });
  }

  private _clearHostElement(hostElement: HTMLElement) {
    while (hostElement.firstChild) {
      hostElement.removeChild(hostElement.firstChild);
    }
  }
}
