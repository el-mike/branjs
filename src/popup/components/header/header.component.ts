import { Store } from '@lib/store';

import {
  Component,
  OnInit,
  EventHandler,
  ViewRef,
} from '@lib/view';

import * as fromState from '../../+state';


@Component({
  template: require('./header.component.html'),
  selector: 'appHeader'
})
export class HeaderComponent implements OnInit {
  public showBackBtn = true;

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

    this.store.dispatch(new fromState.GoToMainMenu());
  }

  public onInit() {
    this.store.subscribe(state => {
      this.showBackBtn = state.ui.showBackButton;
      this.viewRef.requestUpdate();
    });
  }
}
