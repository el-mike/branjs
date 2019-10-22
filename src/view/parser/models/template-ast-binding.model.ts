import { TemplateASTBindingTarget } from './template-ast-binding-target.model';

export class TemplateASTBinding {
  public constructor(
    public hostElement: Node,
    public target: TemplateASTBindingTarget = null,
    public expression: string = '',
  ) {}
}
