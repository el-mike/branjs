import { Store } from '@bran/store';

import {
  Component,
  OnInit,
  EventHandler,
  ViewRef,
} from '@bran/view';

import * as fromState from '../../+state';


@Component({
  template: require('./header.component.html'),
  selector: 'appHeader'
})
export class HeaderComponent implements OnInit {
  public test = true;
  public test2 = false;

  constructor(
    private store: Store<fromState.AppState>,
    private viewRef: ViewRef,
  ) {}

  @EventHandler({
    selector: '#mainMenuBtn',
    event: 'click'
  })
  public goToMainMenu() {
    console.log('goingToMainMenu');
    this.test = !this.test;
    this.test2 = !this.test2;
    this.viewRef.requestUpdate();
  }

  public onInit() {
    console.log('HEADER INIT!');
    this.store.subscribe(state => {
      // this.viewRef.requestUpdate();
    });
  }
}
