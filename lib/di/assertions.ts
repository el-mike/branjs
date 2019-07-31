import { Type } from '../models';

import {
  Provider,
  Token,
  InjectableParam,
} from './models';

import { isClassProvider } from './utils';
import { isInjectable } from './decorators';

import {
  getNotInjectableError,
  getNoProviderForTypeError,
  getRecursiveDependencyDetectedError,
} from './errors';

export const assertInjectableIfClassProvider = <T>(provider: Provider<T>) => {
  if (isClassProvider(provider) && !isInjectable(provider.useClass)) {
    throw new Error(getNotInjectableError(provider));
  }
}

export const assertProviderExists = <T>(type: Token<T>, provider?: Provider<T>) => {
  if (provider === undefined) {
    throw new Error(getNoProviderForTypeError(type));
  }
};

export const assertRecursiveDependencyDetected = <T>(
  argType: InjectableParam | undefined,
  type: Type<T>,
  index: number
) => {
  if (argType === undefined) {
    throw new Error(getRecursiveDependencyDetectedError(type, index));
  }
};
