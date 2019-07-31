import 'reflect-metadata';

import {
  IEventHandlerConfig,
} from '../models';

const EVENT_HANDLERS_METADATA_KEY = Symbol('RENDER:EVENT_HANDLERS_KEY');
const EVENT_HANDLER_METADATA_KEY = Symbol('RENDER:EVENT_HANDLER_KEY');

export function EventHandlerDecorator(config: IEventHandlerConfig) {
  return function<T>(target: T, propertyName: string) {
    const existingHandlers = Reflect.getMetadata(EVENT_HANDLERS_METADATA_KEY, target) || [];

    Reflect.defineMetadata(EVENT_HANDLERS_METADATA_KEY, [...existingHandlers, propertyName], target);

    const metadata = {
      selector: config.selector,
      event: config.event,
      method: propertyName,
    } as IEventHandlerConfig;
    
    Reflect.defineMetadata(EVENT_HANDLER_METADATA_KEY, metadata, target, propertyName);
  }
}

export function getEventHandlers<T>(target: T) {
  return (Reflect.getMetadata(EVENT_HANDLERS_METADATA_KEY, target) || []) as string[];
}

export function getEventHandler<T>(target: T, propertyName: string) {
  return Reflect.getMetadata(EVENT_HANDLER_METADATA_KEY, target, propertyName);
}
