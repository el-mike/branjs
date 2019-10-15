import { Store } from '@bran/store';

import {
  Component,
  ViewRef,
  OnInit
} from '@bran/view';

import * as fromState from './+state';

@Component({
  template: require('./app.component.html'),
  selector: 'app',
})
export class AppComponent implements OnInit {
  public showMainMenu = true;
  public showProperties = false;

  constructor(
    private store: Store<fromState.AppState>,
    private viewRef: ViewRef,
  ) {}

  public onInit() {
    console.log('POPUP INIT!');
    this.store.subscribe(state => {
      console.log(this.viewRef);

      // this.showMainMenu = state.ui.currentView === View.MAIN_MENU;
      // this.showProperties = state.ui.currentView === View.PROPERTIES_LIST;
      this.viewRef.requestUpdate();
    });
  }
}
