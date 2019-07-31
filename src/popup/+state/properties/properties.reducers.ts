import { IProperty } from '@common/models';

import * as fromActions from './properties.actions';

export interface PropertiesState {
  entries: IProperty[];
}

const initialState = {
  entries: [] as IProperty[]
};

export function reducer(
  state = initialState,
  action: fromActions.PropertiesAction,
) {
  switch(action.type) {
    case fromActions.LOAD_PROPERTIES_SUCCESS: {
      return {
        ...state,
        entries: action.properties,
      } as PropertiesState;
    }

    default:
      return state;
  }
}
