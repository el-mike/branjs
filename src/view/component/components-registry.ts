import { Type } from '../../models';

import { getComponentMetadata } from './decorators';

export class ComponentsRegistry {
  private _entryComponent: Type<any>;
  private _components = new Map<string, Type<any>>();

  public registerEntryComponent<T>(type: Type<T>) {
    this._entryComponent = type;
  }

  public registerComponents(types: Type<any>[]) {
    types.map(type => {
      const config = getComponentMetadata(type);

      this._components.set(config.selector, type);
    });
  }

  public getEntryComponent() {
    return this._entryComponent;
  }

  public getBySelector(selector: string) {
    return this._components.get(selector);
  }
}
