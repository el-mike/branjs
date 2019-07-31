import { Store } from '@lib/store';

import {
  Component,
  ViewRef,
  OnInit
} from '@lib/view';

import { View } from './models';

import * as fromState from './+state';

// chrome.storage.sync.get('properties', data => {
//   const properties = data.properties;

//   // dispatchAction(new LoadPropertiesSuccess(properties));
// });

@Component({
  template: require('./popup.component.html'),
  selector: 'appPopup',
})
export class Popup implements OnInit {
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

      this.showMainMenu = state.ui.currentView === View.MAIN_MENU;
      this.showProperties = state.ui.currentView === View.PROPERTIES_LIST;
      this.viewRef.requestUpdate();
    });
  }
}
