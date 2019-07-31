import { Type } from '../../models';

import {
  Token,
  InjectionToken,
} from '../models';

import { DiContainer } from '../di-container';

export class Injector extends DiContainer { 
  constructor(private readonly _parentInjector: Injector = null) {
    super();
  }

  public get<T>(type: Token<T> | InjectionToken) {
    return  this.inject(type);
  }

  public inject<T>(type: Token<T>): T {
    if (!this._hasProvider(type) && this._hasParentInjector()) {
      return this._parentInjector.inject(type);
    }

    const provider = this._providers.get(type);

    return this._injectWithProvider(type, provider);
  }

  public resolve<T>(target: Type<T>): T {
    const params = this._getInjectedParams(target);

    return Reflect.construct(target, params);
  }

  protected _hasParentInjector() {
    return !!this._parentInjector && this._parentInjector instanceof Injector;
  }

  protected _hasProvider<T>(type: Token<T>) {
    return !!this._providers.get(type);
  }
}
