import { Todo } from '../../models';

import * as fromActions from './todos.actions';

export interface TodosState {
  entries: Todo[];
}

const initialState = {
  entries: [] as Todo[]
};

export function reducer(
  state = initialState,
  action: fromActions.TodosAction,
) {
  switch(action.type) {
    case fromActions.LOAD_TODOS_SUCCESS: {
      return {
        ...state,
        entries: action.todos,
      } as TodosState;
    }

    default:
      return state;
  }
}
