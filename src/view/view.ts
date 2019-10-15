import { Type } from '../models';

import { Tree } from '../structs';

import { RootInjector } from '../di';

import { Parser } from './parser';
import { Compiler } from './compiler';

import {
  assertEntryComponentRegistered,
} from './assertions';

import {
  getComponentMetadata,
  ComponentsRegistry,
} from './component';

import {
  ComponentFactory
} from './component';

import { ViewRef } from './view-ref';

export class View {
  private static _instance: View;

  private _parser: Parser;
  private _compiler: Compiler;

  private _componentFactory: ComponentFactory;

  private _viewTree: Tree<ViewRef>;

  public get viewTree() {
    return this._viewTree;
  }

  public set viewTree(tree: Tree<ViewRef>) {
    this._viewTree = tree;
  }

  private constructor(
    private readonly _rootInjector: RootInjector,
    private readonly _componentsRegistry: ComponentsRegistry,
  ) {
    this._componentFactory = ComponentFactory.getInstance(this._rootInjector, this);

    this._parser = Parser.getInstance(document);
    this._compiler = Compiler.getInstance(this._parser, this._componentFactory, this._componentsRegistry);
  }

  public static getInstance(
    rootInjector: RootInjector,
    componentsRegistry: ComponentsRegistry,
  ) {
    if (!View._instance) {
      View._instance = new View(rootInjector, componentsRegistry);
    }

    return View._instance;
  }

  public bootstrap(appHost: HTMLElement) {
    const entryComponent = this._componentsRegistry.getEntryComponent();

    assertEntryComponentRegistered(entryComponent);

    const rootViewRef = this._compiler.compile(entryComponent, appHost);

    console.log(this._viewTree);
    console.log(rootViewRef);

    this._viewTree.traverseBF(treeNode => {
      const viewRef = treeNode.data;

      viewRef.init();
    });

    this._viewTree.root.data.update();
  }
}
