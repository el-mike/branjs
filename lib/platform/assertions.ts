import { IApplicationMetadata } from '../application';

import { getAppConfigurationMissingError } from './errors';

export const assertAppConfigExists = (config: IApplicationMetadata) => {
  if (!config.entryComponent || !config.components || !config.providers) {
    throw new Error(getAppConfigurationMissingError());
  }
}
