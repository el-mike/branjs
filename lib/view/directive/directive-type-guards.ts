import {
  DirectiveType,
  Directive
} from './directive';

import { IfDirective } from './if-directive';

interface DirectiveCandidate {
  type: DirectiveType;
}

export function isIfDirective(candidate: DirectiveCandidate): candidate is IfDirective {
  return candidate.type === DirectiveType.IF;
}
