import { Binding } from './binding';

import {
  DirectiveType,
  Directive
} from './directive';

import { ViewRef } from './view-ref';

export class ViewNode {
  public viewRef?: ViewRef;

  public componentSelector?: string;

  public bindings?: Binding[];
  public directives?: Map<DirectiveType, Directive>;

  private _active = true;
  private _deactivated = false;

  public get active() {
    return this._active;
  }

  public get deactivated() {
    return this._deactivated;
  }
  
  public constructor(public element: HTMLElement) {
    this.bindings = [];
    this.directives = new Map();
  }

  public isActive() {
    return this._active;
  }

  public isDeactivated() {
    return this._deactivated;
  }

  public markAsActive() {
    this._active = true;
    this._deactivated = false;
  }

  public markAsDeactivated() {
    this._active = false;
    this._deactivated = true;
  }
 }
