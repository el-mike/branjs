import {
  BaseProvider,
  ClassProvider,
  ValueProvider,
  FactoryProvider
} from '../models';

export function isClassProvider<T>(provider: BaseProvider<T>): provider is ClassProvider<T> {
  return (provider as any).useClass !== undefined;
}

export function isValueProvider<T>(provider: BaseProvider<T>): provider is ValueProvider<T> {
  return (provider as any).useValue !== undefined;
}

export function isFactoryProvider<T>(provider: BaseProvider<T>): provider is FactoryProvider<T> {
  return (provider as any).useFactory !== undefined;
}
