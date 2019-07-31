import { Action } from '@lib/store';

export const GO_TO_MAIN_MENU = '[ui] Go To Main Menu';

export class GoToMainMenu implements Action {
  public readonly type = GO_TO_MAIN_MENU;
}

export const GO_TO_PROPERTIES_LIST = '[ui] Go to Properties List';

export class GoToPropertiesList implements Action {
  public readonly type = GO_TO_PROPERTIES_LIST;
}

export type UiAction =
  | GoToMainMenu
  | GoToPropertiesList;
