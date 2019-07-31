import './popup.scss';

import { Platform } from '@lib/platform';

import { App } from '@lib/application';

import { Store } from '@lib/store';

import {
  DOCUMENT_REF_TOKEN,
} from './tokens';

import {
  AppState,
  reducers,
} from './+state';

import {
  HeaderComponent,
  PropertiesComponent,
  MainMenuComponent,
} from './components';

import { Popup } from './popup';

function StoreFactory() {
  return new Store<AppState>(reducers);
}

const platform = Platform.getInstance();

@App({
  entryComponent: Popup,
  providers: [
    { provide: DOCUMENT_REF_TOKEN, useValue: document },
    { provide: Store, useFactory: StoreFactory },
  ],
  components: [
    HeaderComponent,
    MainMenuComponent,
    PropertiesComponent,
  ],
})
class PopupApp {}

const container = document.querySelector('.container') as HTMLElement;

platform.bootstrap(PopupApp, container);
