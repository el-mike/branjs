import {
  LifecycleHooks,
} from './lifecycle-hooks.model';

export interface IComponentConfig {
  template: string;
  selector?: string;
}

export interface IComponentMetadata {
  isComponent?: boolean;
  template: string;
  selector?: string;
}

export type ComponentInstance<T> = T
  & LifecycleHooks
  & { [key: string]: any };
