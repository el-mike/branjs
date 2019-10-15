import { TemplateASTBinding } from './template-ast-binding.model';
import { TemplateASTDirective } from './template-ast-directive.model';

export class TemplateASTNode {
  public parentElement: HTMLElement;

  public componentSelector?: string;
  public bindings?: TemplateASTBinding[];
  public directives?: TemplateASTDirective[];
  
  public constructor(public element: HTMLElement) {
    this.bindings = [];
    this.directives = [];
  }

  public addBinding(binding: TemplateASTBinding) {
    if (!binding) {
      return;
    }

    this.bindings.push(binding);
  }

  public addDirective(directive: TemplateASTDirective) {
    if (!directive) {
      return;
    }

    this.directives.push(directive);
  }
}
