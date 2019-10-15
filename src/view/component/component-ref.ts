import {
  Dictionary,
  Type,
} from '../../models';

import {
  isFunction
} from '../../utils';

import { Injector } from '../../di';

import { Renderer } from '../render';

import {
  ComponentInstance,
  IViewChild,
  IEventHandler
} from './models';

import {
  getViewChild,
  getViewChildren,
  getEventHandler,
  getEventHandlers,
} from './decorators';

export interface IComponentRef<T> {
  componentType: Type<T>;
  selector: string;
  template: string;

  instance: ComponentInstance<T>;
  injector: Injector;
  hostEl?: HTMLElement;

  renderer: Renderer;

  viewChildren?: Dictionary<IViewChild>;
  eventHandlers?: Dictionary<IEventHandler>;
}

export class ComponentRef<T> implements IComponentRef<T> {
  public initialized: boolean;
  public destroyed: boolean;

  public componentType: Type<T>;
  public selector: string;
  public template: string;

  public instance: ComponentInstance<T>;
  public injector: Injector;
  public hostEl: HTMLElement;

  public renderer: Renderer;

  public viewChildren: Dictionary<IViewChild>;
  public eventHandlers: Dictionary<IEventHandler>;

  public constructor(payload: IComponentRef<T> = {} as IComponentRef<T>) {
    this.componentType = payload.componentType || null;
    this.selector = payload.selector || '';
    this.template = payload.template || '';
    this.hostEl = payload.hostEl || null;
    this.instance = payload.instance || null;
    this.injector = payload.injector || null;
    this.renderer = payload.renderer || null;
    this.viewChildren = payload.viewChildren || {};
    this.eventHandlers = payload.eventHandlers || {};
  }

  public init() {
    this.instance = this.injector.resolve(this.componentType);

    this.eventHandlers = this._getEventHandlers(this.instance);
    this.viewChildren = this._getViewChildren(this.instance);

    if (this.instance.onInit && isFunction(this.instance.onInit)) {
      this.instance.onInit();
    }

    this.destroyed = false;
    this.initialized = true;
  }

  public destroy() {
    if (this.instance.onDestroy && isFunction(this.instance.onDestroy)) {
      this.instance.onDestroy();
    }

    this.instance = null;
    
    this.initialized = false;
    this.destroyed = true;
  }

  public setupEventHandlers(ctx: HTMLElement) {
    Object.keys(this.eventHandlers).map(key => {
      const handler = this.eventHandlers[key];

      const element = ctx.querySelector(handler.selector) as HTMLElement;

      if (!element) {
        return;
      }

      element.addEventListener(handler.event, this.instance[handler.method].bind(this.instance));
    });
  }

  private _getEventHandlers<T>(instance: T) {
    const handlerProps = getEventHandlers(instance);
    return handlerProps.reduce((total, key) => {
      return {
        ...total,
        [key]: getEventHandler(instance, key)
      }
    }, {});
  }

  private _getViewChildren<T>(instance: T) {
    const viewChildProps = getViewChildren(instance);
    return viewChildProps.reduce((total, key) => {
      return {
        ...total,
        [key]: getViewChild(instance, key)
      }
    }, {});
  }
}
