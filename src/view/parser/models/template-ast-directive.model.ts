import { DirectiveType } from '../../directive';

import { TemplateASTBindingTarget } from './template-ast-binding-target.model';

export class TemplateASTDirective extends TemplateASTBindingTarget {
  constructor(
    public type: DirectiveType,
  ) {
    super();
  }
}
