import {
  TemplateASTBinding,
} from '../parser';

import {
  Binding,
} from '../binding';

import {
  ViewNode,
} from '../view-node';

import {
  BindingTargetFactory,
} from './binding-target.factory';

export class BindingBuilder {
  private static _instance: BindingBuilder;

  private constructor(
    private readonly _bindingTargetFactory: BindingTargetFactory, 
  ) {}

  public static getInstance(
    bindingTargetFactory: BindingTargetFactory,
  ) {
    if (!BindingBuilder._instance) {
      BindingBuilder._instance = new BindingBuilder(bindingTargetFactory);
    }

    return BindingBuilder._instance;
  }

  public build(
    astBinding: TemplateASTBinding,
    viewNode: ViewNode,
  ): Binding {
    const bindingTarget = this._bindingTargetFactory.create(
      astBinding.target,
      viewNode,
    );

    return new Binding(viewNode, bindingTarget, astBinding.expression);
  }
}
