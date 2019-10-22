import { ViewNode } from '../view-node';

import {
  BindingTarget,
} from '../binding';

export enum DirectiveType {
  IF = 'IF',
  FOR = 'FOR'
}

export abstract class Directive extends BindingTarget {
  constructor(
    public type: DirectiveType,
    public viewNode: ViewNode,
  ) {
    super();
  }
}
