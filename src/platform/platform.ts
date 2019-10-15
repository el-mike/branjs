import 'reflect-metadata';

import { Type } from '../models';

import {
  getAppConfig,
} from '../application';

import {
  DiContainer,
  Provider,
  RootInjector,
} from '../di';

import {
  View,
  ViewRef,
  ComponentsRegistry,
} from '../view';

import {
  assertAppConfigExists,
} from './assertions';

export class Platform {
  private static _instance: Platform;

  private _rootInjector: RootInjector;

  private _componentsRegistry: ComponentsRegistry;

  private _view: View;

  private constructor() {}

  public static getInstance() {
    if (!Platform._instance) {
      Platform._instance = new Platform();
    }

    return Platform._instance;
  }

  public bootstrap<T>(app: Type<T>, appHost: HTMLElement) {
    const appConfig = getAppConfig(app);
    
    assertAppConfigExists(appConfig);

    const providers = appConfig.providers;
    const components = appConfig.components;
    const entryComponent = appConfig.entryComponent;

    this._componentsRegistry = new ComponentsRegistry();

    this._componentsRegistry.registerEntryComponent(entryComponent);
    this._componentsRegistry.registerComponents(components);

    this._rootInjector = RootInjector.getInstance();
    this._view = View.getInstance(this._rootInjector, this._componentsRegistry);

    this._registerProviders(providers);

    this._view.bootstrap(appHost);
  }

  private _registerProviders(providers: Provider<any>[]) {
    providers.map(provider => this._rootInjector.addProvider(provider));
  }
}
