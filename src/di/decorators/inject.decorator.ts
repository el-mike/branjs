import 'reflect-metadata';

import { Token } from '../models';

const INJECT_METADATA_KEY = Symbol('DI:INJECT_KEY');

/**
 * Inject Decorator - applied to constructor arguments in order to inject
 * non-class dependency.
 * Index is a index of argument in arguments array.
 */
export function Inject(token: Token<any>) {
  return function(target: any, _: string | symbol, index: number) {
    const indexData = `index-${index}`;

    Reflect.defineMetadata(INJECT_METADATA_KEY, token, target, indexData);

    return target;
  }
}

export function getInjectionToken(target: any, index: number) {
  const indexData = `index-${index}`;
  return Reflect.getMetadata(INJECT_METADATA_KEY, target, indexData) as Token<any> | undefined;
}
