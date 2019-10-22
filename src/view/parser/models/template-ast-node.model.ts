import { TemplateASTBinding } from './template-ast-binding.model';
import { TemplateASTDirective } from './template-ast-directive.model';

export class TemplateASTNode {
  public parentElement: HTMLElement;

  public componentSelector?: string;
  public bindings?: TemplateASTBinding[];
  
  public constructor(public element: HTMLElement) {
    this.bindings = [];
  }

  public addBinding(binding: TemplateASTBinding) {
    if (!binding) {
      return;
    }

    this.bindings.push(binding);
  }
}
