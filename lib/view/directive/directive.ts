import { ViewNode } from '../view-node';

export enum DirectiveType {
  IF = 'IF',
  FOR = 'FOR'
}

export abstract class Directive {
  constructor(
    public type: DirectiveType,
    public viewNode: ViewNode,
  ) {}

  public abstract run(): void;
}
