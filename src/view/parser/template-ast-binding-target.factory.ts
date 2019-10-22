import { DirectiveType } from '../directive';

import {
  TemplateASTBindingTarget,
  TemplateASTDirective,
  TemplateASTInterpolation,
  TemplateASTInput,
  TemplateASTOutput,
} from './models';

import { PATTERNS } from './patterns';

import {
  IS_IF_DIRECTIVE_REGEXP,
  IS_FOR_DIRECTIVE_REGEXP,
  IS_INPUT_REGEXP,
  IS_OUTPUT_REGEXP,
  INTERPOLATION_REGEXP,
} from './reg-exp';

export class TemplateASTBindingTargetFactory {
  private static _instance: TemplateASTBindingTargetFactory;

  private constructor() {}

  public static getInstance() {
    if (!TemplateASTBindingTargetFactory._instance) {
      TemplateASTBindingTargetFactory._instance = new TemplateASTBindingTargetFactory();
    }

    return TemplateASTBindingTargetFactory._instance;
  }

  public create(lexeme: string): TemplateASTBindingTarget {
    if (IS_IF_DIRECTIVE_REGEXP.test(lexeme)) {
      return new TemplateASTDirective(DirectiveType.IF);
    }

    if (IS_FOR_DIRECTIVE_REGEXP.test(lexeme)) {
      return new TemplateASTDirective(DirectiveType.FOR);
    }

    if (IS_INPUT_REGEXP.test(lexeme)) {
      const propName = lexeme.replace(`${PATTERNS.INPUT}-`, '');

      return new TemplateASTInput(propName);
    }

    if (IS_OUTPUT_REGEXP.test(lexeme)) {
      const propName = lexeme.replace(`${PATTERNS.OUTPUT}-`, '');

      return new TemplateASTOutput(propName);
    }

    if (INTERPOLATION_REGEXP.test(lexeme)) {
      return new TemplateASTInterpolation();
    }
  }
}
