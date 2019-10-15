import 'reflect-metadata';

import {
  Type
} from '../../models';

import {
  RootInjector,
  Injector,
} from '../../di';

import {
  IComponentRef,
  ComponentRef,
} from './component-ref';

import {
  getComponentMetadata,
} from './decorators';

import { View } from '../view';

import { Renderer } from '../render';

import { assertComponentMetadataExists } from '../assertions';

export class ComponentFactory {
  private static _instance: ComponentFactory;

  private constructor(
    private readonly _rootInjector: RootInjector,
    private readonly _view: View,
  ) {}

  public static getInstance(rootInjector: RootInjector, view: View) {
    if (!ComponentFactory._instance) {
      ComponentFactory._instance = new ComponentFactory(rootInjector, view);
    }

    return ComponentFactory._instance;
  }

  public create<T>(type: Type<T>, hostEl: HTMLElement) {
    const componentConfig = getComponentMetadata<T>(type);

    assertComponentMetadataExists(componentConfig);

    const injector = new Injector(this._rootInjector);
    const renderer = new Renderer(this._view, this);

    const config = {
      componentType: type,
      template: componentConfig.template,
      selector: componentConfig.selector,
      injector,
      hostEl,
      renderer,
    } as IComponentRef<T>;

    return new ComponentRef<T>(config);
  }
}
