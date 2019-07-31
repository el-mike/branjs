import { Store } from '@lib/store';

import {
  Component,
  OnInit,
  OnDestroy,
  EventHandler,
} from '@lib/view';

import { Inject } from '@lib/di';

import {
  DOCUMENT_REF_TOKEN
} from '../../tokens';

import * as fromState from '../../+state';

@Component({
  template: require('./main-menu.component.html'),
  selector: 'appMainMenu'
})
export class MainMenuComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromState.AppState>,
    @Inject(DOCUMENT_REF_TOKEN) private documentRef: Document = document,
  ) {}

  @EventHandler({
    selector: '#propertiesListBtn',
    event: 'click'
  })
  public goToProperties() {
    console.log('CLICKED!!');
    this.store.dispatch(new fromState.GoToPropertiesList());
  }

  public onInit() {
    console.log('MAIN_MENU INIT!');
    // const propertiesListBtn = this.documentRef.querySelector('#propertiesListBtn');

    // propertiesListBtn.addEventListener('click', () => this.store.dispatch(new fromState.GoToPropertiesList()));
  }

  public onDestroy() {
    console.log('MAIN_MENU DESTROY!');
  }
}
