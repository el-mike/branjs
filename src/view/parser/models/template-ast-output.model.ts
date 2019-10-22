import { TemplateASTBindingTarget } from './template-ast-binding-target.model';

export class TemplateASTOutput extends TemplateASTBindingTarget {
  constructor(
    public propName: string,
  ) {
    super();
  }
}
