import {
  ReducersMap,
} from '@lib/store';

import * as fromPropertiesReducer from './properties/properties.reducers';
import * as fromUiReducer from './ui/ui.reducers';

export interface AppState {
  properties: fromPropertiesReducer.PropertiesState;
  ui: fromUiReducer.UiState;
}

export const reducers: ReducersMap<AppState> = {
  properties: fromPropertiesReducer.reducer,
  ui: fromUiReducer.reducer
};
