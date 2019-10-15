import 'reflect-metadata';

import { Type } from '../../models';

const INJECTABLE_METADATA_KEY = Symbol('DI:INJECTABLE_KEY');

export function Injectable() {
  return function<T = any>(target: Type<T>) {
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);

    return target;
  }
}

export function isInjectable<T>(target: Type<T>) {
  return Reflect.getMetadata(INJECTABLE_METADATA_KEY, target) === true;
}
