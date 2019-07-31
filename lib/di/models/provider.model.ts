import { Type } from '../../models/type.model';

import { Token } from './token.model';

export interface BaseProvider<T> {
  provide: Token<T>;
  singleton?: boolean;
}

export interface ClassProvider<T> extends BaseProvider<T> {
  useClass: Type<T>;
}

export interface ValueProvider<T> extends BaseProvider<T> {
  useValue: T;
}

export type Factory<T> = () => T;

export interface FactoryProvider<T> extends BaseProvider<T> {
  useFactory: Factory<T>;
}

export type Provider<T> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>;
