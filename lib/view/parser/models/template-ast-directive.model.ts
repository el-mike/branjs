import { DirectiveType } from '../../directive';

export class TemplateASTDirective {
  constructor(
    public type: DirectiveType,
    public hostElement: HTMLElement,
    public propName: string,
  ) {}
}
