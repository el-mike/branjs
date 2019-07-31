import { View } from '../../models';

import * as fromActions from './ui.actions';

export interface UiState {
  currentView: View;
  showBackButton: boolean;
}

const initialState = {
  currentView: View.MAIN_MENU,
  showBackButton: false,
};

export function reducer(
  state = initialState,
  action: fromActions.UiAction,
) {
  switch(action.type) {
    case fromActions.GO_TO_MAIN_MENU: {
      return {
        ...state,
        currentView: View.MAIN_MENU,
        showBackButton: false,
      } as UiState;
    }

    case fromActions.GO_TO_PROPERTIES_LIST: {
      return {
        ...state,
        currentView: View.PROPERTIES_LIST,
        showBackButton: true,
      } as UiState;
    }

    default:
      return state;
  }
}
