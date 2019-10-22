import { ViewNode } from '../view-node';

import {
  DirectiveType,
  Directive,
} from './directive';

export class IfDirective extends Directive {
  public constructor(
    viewNode: ViewNode,
  ) {
    super(DirectiveType.IF, viewNode);
  }

  // public updateValue(value: boolean) {
  //   this.value = value;
  // }

  public run() {
    // if (this.value) {
    //   this.viewNode.markAsActive();
    // } else {
    //   this.viewNode.markAsDeactivated();
    // }
  }
}
