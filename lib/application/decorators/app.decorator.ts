import 'reflect-metadata';

import { Type } from '../../models';

import { IApplicationMetadata } from '../models';

const APPLICATION_METADATA_KEY = Symbol('APP:APPLICATION_KEY');

export function App(config: IApplicationMetadata) {
  return function<T = any>(target: Type<T>) {
    Reflect.defineMetadata(APPLICATION_METADATA_KEY, config, target);

    return target;
  }
}

export function getAppConfig<T>(target: Type<T>) {
  return Reflect.getMetadata(APPLICATION_METADATA_KEY, target) as IApplicationMetadata | undefined;
}
