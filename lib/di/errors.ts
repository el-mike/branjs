import { Type } from '../models';

import {
  ClassProvider,
  Token,
} from './models';

import { getTokenName } from './utils';

export const getNotInjectableError = <T>(provider: ClassProvider<T>) => `
  Cannot provide ${getTokenName(provider.provide)} using class ${getTokenName(provider.useClass)}:
  ${getTokenName(provider.useClass)} is not injectable!
`;

export const getNoProviderForTypeError = <T>(type: Token<T>) =>`
  No provider for type ${getTokenName(type)}
`;

export const getRecursiveDependencyDetectedError = <T>(type: Type<T>, index: number) => `
  Injection error. Recursive dependency detected in constructor for type
  ${type.name} with parameter at index ${index}.
`;
