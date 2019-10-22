import {
  TemplateASTBindingTarget,
  TemplateASTDirective,
  TemplateASTInput,
  TemplateASTOutput,
  TemplateASTInterpolation,
} from '../parser';

import {
  BindingTarget,
} from '../binding';

import {
  IfDirective,
  Directive,
  DirectiveType,
} from '../directive';

import {
  Interpolation,
} from '../interpolation';

import {
  Input,
} from '../input';

import {
  Output,
} from '../output';

import { ViewNode } from '../view-node';

export class BindingTargetFactory {
  private static _instance: BindingTargetFactory;

  private constructor() {}

  public static getInstance() {
    if (!BindingTargetFactory._instance) {
      BindingTargetFactory._instance = new BindingTargetFactory();
    }

    return BindingTargetFactory._instance;
  }

  public create(
    astBindingTarget: TemplateASTBindingTarget,
    viewNode: ViewNode,
  ): BindingTarget {
    if (astBindingTarget instanceof TemplateASTDirective) {
      if (astBindingTarget.type === DirectiveType.IF) {
        return new IfDirective(viewNode);
      }
    }

    if (astBindingTarget instanceof TemplateASTInput) {
      return new Input();
    }

    if (astBindingTarget instanceof TemplateASTOutput) {
      return new Output();
    }

    if (astBindingTarget instanceof TemplateASTInterpolation) {
      return new Interpolation();
    }
  }
}
