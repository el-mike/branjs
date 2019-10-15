import { ViewNode } from '../view-node';

export class Binding {
  public previousValue: any;

  public constructor(
    public viewNode: ViewNode,
    public propName: string,
    public value: any = null
  ) {
    this.previousValue = null;
  }
}
