import { TemplateASTBindingTarget } from './template-ast-binding-target.model';

export class TemplateASTInput extends TemplateASTBindingTarget {
  constructor(
    public propName: string,
  ) {
    super();
  }
}
