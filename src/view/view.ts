import { Tree } from '../structs';

import { RootInjector } from '../di';

import {
  Parser,
  TemplateASTBindingTargetFactory,
} from './parser';

import {
  Compiler,
  BindingBuilder,
  BindingTargetFactory,
} from './compiler';

import {
  assertEntryComponentRegistered,
} from './assertions';

import {
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

  private _viewRefTree: Tree<ViewRef>;

  public get viewRefTree() {
    return this._viewRefTree;
  }

  public set viewRefTree(tree: Tree<ViewRef>) {
    this._viewRefTree = tree;
  }

  private constructor(
    private readonly _rootInjector: RootInjector,
    private readonly _componentsRegistry: ComponentsRegistry,
  ) {
    this._componentFactory = ComponentFactory.getInstance(this._rootInjector, this);

    const templateASTBindingTargetFactory = TemplateASTBindingTargetFactory.getInstance();

    this._parser = Parser.getInstance(templateASTBindingTargetFactory);

    const bindingTargetFactory = BindingTargetFactory.getInstance();
    const bindingBuilder = BindingBuilder.getInstance(bindingTargetFactory);

    this._compiler = Compiler.getInstance(
      this._parser,
      this._componentFactory,
      this._componentsRegistry,
      bindingBuilder,
    );
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

    this.viewRefTree = this._compiler.compile(entryComponent, appHost);
    console.log(this.viewRefTree);

    this._viewRefTree.root.data.requestUpdate();
  }
}
