import { Action } from '@lib/store';
import { IProperty } from '@common/models';

export const LOAD_PROPERTIES         = '[Properties] Load Properties';
export const LOAD_PROPERTIES_FAIL    = '[Properties] Load Properties Fail';
export const LOAD_PROPERTIES_SUCCESS = '[Properties] Load Properties Success';

export class LoadProperties implements Action {
  public readonly type = LOAD_PROPERTIES;
}

export class LoadPropertiesFail implements Action {
  public readonly type = LOAD_PROPERTIES_FAIL;

  constructor(public error: Error) {}
}

export class LoadPropertiesSuccess implements Action {
  public readonly type = LOAD_PROPERTIES_SUCCESS;

  constructor(public properties: IProperty[]) {}
}

export type PropertiesAction =
  | LoadProperties
  | LoadPropertiesFail
  | LoadPropertiesSuccess;
