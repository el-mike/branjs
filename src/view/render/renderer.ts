import 'reflect-metadata';

import {
  isFunction,
  isUndefined,
  isNull,
} from '../../utils';

import { View } from '../view';
import { ComponentFactory } from '../component/component.factory';

import {
  ComponentRef,
} from '../component';

export class Renderer {
  constructor(
    private _view: View,
    private _componentFactory: ComponentFactory,
  ) {}

  public render<T>(component: ComponentRef<T>) {
    const ctx = component.hostEl;

    ctx.innerHTML = '';

    this._attachViewChildren<T>(component.hostEl, component);
  }

  private _attachViewChildren<T>(ctx: HTMLElement, component: ComponentRef<T>) {
    Object.keys(component.viewChildren).map(key => {
      const viewChild = component.viewChildren[key];

      const element = ctx.querySelector(viewChild.selector) as HTMLElement;

      if (!element) {
        return;
      }

      viewChild.element = element;
    });
  }
}
