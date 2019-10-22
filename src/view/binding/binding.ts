import { ViewNode } from '../view-node';

import { BindingTarget } from './binding-target';

export class Binding {
  public value: any;
  public previousValue: any;

  public constructor(
    public viewNode: ViewNode,
    public bindingTarget: BindingTarget,
    public expression: string,

  ) {
    this.previousValue = null;
  }
}
