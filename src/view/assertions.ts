import { Type } from '../models';

import {
  IComponentMetadata,
} from './component';

import {
  getComponentMetadataMissingError,
  getEntryComponentNotRegisteredError,
} from './errors';

export const assertComponentMetadataExists = (config: IComponentMetadata) => {
  if (!config.isComponent || !config.template) {
    throw new Error(getComponentMetadataMissingError());
  }
};

export const assertEntryComponentRegistered = (entryComponent: Type<any>) => {
  if (!entryComponent) {
    throw new Error(getEntryComponentNotRegisteredError());
  }
}
