import {
  ReducersMap,
} from '@bran/store';

import * as fromTodosReducer from './todos/todos.reducers';

export interface AppState {
  todos: fromTodosReducer.TodosState;
}

export const reducers: ReducersMap<AppState> = {
  todos: fromTodosReducer.reducer,
};
