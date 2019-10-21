export class TemplateASTBinding {
  public constructor(
    public hostElement: Node,
    public propName: string,
    public expression: string = '',
  ) {}
}
