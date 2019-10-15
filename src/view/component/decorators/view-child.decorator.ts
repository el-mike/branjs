import 'reflect-metadata';

import {
  IViewChildConfig,
} from '../models';

const VIEW_CHILDREN_METADATA_KEY = Symbol('RENDER:VIEW_CHILDREN_KEY');
export const VIEW_CHILD_METADATA_KEY = Symbol('RENDER:VIEW_CHILD_KEY');

export function ViewChildDecorator(config: IViewChildConfig) {
  return function<T>(target: T, propertyName: string) {
    const existingChildren = Reflect.getMetadata(VIEW_CHILDREN_METADATA_KEY, target) || [];

    Reflect.defineMetadata(VIEW_CHILDREN_METADATA_KEY, [...existingChildren, propertyName], target);

    const metadata = {
      selector: config.selector,
    } as IViewChildConfig;
    
    Reflect.defineMetadata(VIEW_CHILD_METADATA_KEY, metadata, target, propertyName);
  }
}

export function getViewChildren<T>(target: T) {
  return (Reflect.getMetadata(VIEW_CHILDREN_METADATA_KEY, target) || []) as string[];
}

export function getViewChild<T>(target: T, propertyName: string) {
  return Reflect.getMetadata(VIEW_CHILD_METADATA_KEY, target, propertyName);
}
