import 'reflect-metadata';

import { Type } from '../models';

import {
  Token,
  Provider,
  ClassProvider,
  ValueProvider,
  FactoryProvider,
  InjectableParam,
} from './models';

import {
  isClassProvider,
  isValueProvider,
} from './utils';

import {
  getInjectionToken,
} from './decorators';

import {
  assertInjectableIfClassProvider,
  assertProviderExists,
  assertRecursiveDependencyDetected,
} from './assertions';

export class DiContainer {
  protected static REFLECT_PARAMS = 'design:paramtypes';

  protected _providers = new Map<Token<any>, Provider<any>>();
  protected _cache = new WeakMap<Token<any>, any>();

  public constructor() {}

  public addProvider<T>(provider: Provider<T>) {
    assertInjectableIfClassProvider(provider);

    this._providers.set(provider.provide, provider);
  }

  public inject<T>(type: Token<T>): T {
    const provider = this._providers.get(type);

    return this._injectWithProvider(type, provider);
  }

  public resolve<T>(target: Type<T>): T {
    const params = this._getInjectedParams(target);

    return Reflect.construct(target, params);
  }

  protected _injectWithProvider<T>(type: Token<T>, provider?: Provider<T>): T {
    assertProviderExists(type, provider);

    const cached = this._getCached(provider);
    if (cached) {
      return cached;
    }

    if (isClassProvider(provider)) {
      return this._injectClass(provider as ClassProvider<T>);
    } else if (isValueProvider(provider)) {
      return this._injectValue(provider as ValueProvider<T>);
    } else {
      return this._injectFactory(provider as FactoryProvider<T>);
    }
  }

  protected _injectValue<T>(provider: ValueProvider<T>): T {
    return this._cacheDependency(provider, provider.useValue);
  }

  protected _injectFactory<T>(provider: FactoryProvider<T>): T {
    return this._cacheDependency(provider, provider.useFactory());
  }

  protected _injectClass<T>(provider: ClassProvider<T>): T {
    const target = provider.useClass;
    const params = this._getInjectedParams(target);

    return this._cacheDependency(provider, Reflect.construct(target, params));
  }

  /**
   * Recursively resolves the dependencies by resolving the types
   * form the class constructor's arguments.
   */
  protected _getInjectedParams<T>(target: Type<T>) {
    const argTypes = Reflect.getMetadata(
      DiContainer.REFLECT_PARAMS,
      target
    ) as (InjectableParam | undefined)[];

    if (argTypes === undefined) {
      return [];
    }

    return argTypes.map((argType, index) => {
      assertRecursiveDependencyDetected(argType, target, index);

      /**
       * Tries to override token in case parameter is not class.
       * Using a class is "default" behavior.
       */
      const overrideToken = getInjectionToken(target, index);
      const actualToken = overrideToken === undefined ? argType : overrideToken;

      return this.inject(actualToken);
    });
  }

  protected _cacheDependency<T>(provider: Provider<T>, value: any) {
    if (!provider.singleton) {
      this._cache.set(provider.provide, value);
    }

    return value;
  }

  protected _getCached<T>(provider: Provider<T>) {
    return this._cache.get(provider.provide);
  }
}
