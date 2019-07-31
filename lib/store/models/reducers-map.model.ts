import { State } from './state.model';
import { Action } from './action.model';

type ReducerFn<T = {}> = (state: T, action: Action) => T;

export type ReducersMap<T = {}> = {
  [K in keyof T]: ReducerFn<T[K]>;
}
