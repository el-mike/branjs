import { Action } from '@bran/store';

import { Todo } from '../../models';

export const LOAD_TODOS         = '[Todos] Load Todos';
export const LOAD_TODOS_FAIL    = '[Todos] Load Todos Fail';
export const LOAD_TODOS_SUCCESS = '[Todos] Load Todos Success';

export class LoadTodos implements Action {
  public readonly type = LOAD_TODOS;
}

export class LoadTodosFail implements Action {
  public readonly type = LOAD_TODOS_FAIL;

  constructor(public error: Error) {}
}

export class LoadTodosSuccess implements Action {
  public readonly type = LOAD_TODOS_SUCCESS;

  constructor(public todos: Todo[]) {}
}

export type TodosAction =
  | LoadTodos
  | LoadTodosFail
  | LoadTodosSuccess;
