import 'reflect-metadata';

import {
  Constructor,
  Type,
} from '../../../models';

import {
  IComponentConfig,
  IComponentMetadata,
} from '../models';

const COMPONENT_METADATA_KEY = Symbol('RENDER:COMPONENT_KEY');

export function ComponentDecorator(config: IComponentConfig) {
  return function <T extends Constructor>(target: T) {
    const metadata = {
      isComponent: true,
      template: config.template,
      selector: config.selector,
    } as IComponentMetadata;

    Reflect.defineMetadata(COMPONENT_METADATA_KEY, metadata, target);

    return target;
  };
}

export function getComponentMetadata<T>(target: Type<T>) {
  return Reflect.getMetadata(COMPONENT_METADATA_KEY, target) as IComponentMetadata | undefined;
}
