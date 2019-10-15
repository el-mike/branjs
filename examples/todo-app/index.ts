import './app.component.scss';

import { Platform } from '@bran/platform';

import { App } from '@bran/application';

import { Store } from '@bran/store';

import {
  DOCUMENT_REF_TOKEN,
} from './tokens';

import {
  AppState,
  reducers,
} from './+state';

import {
  HeaderComponent,
} from './components';

import { AppComponent } from './app.component';

function StoreFactory() {
  return new Store<AppState>(reducers);
}

const platform = Platform.getInstance();

@App({
  entryComponent: AppComponent,
  providers: [
    { provide: DOCUMENT_REF_TOKEN, useValue: document },
    { provide: Store, useFactory: StoreFactory },
  ],
  components: [
    HeaderComponent,
  ],
})
class PopupApp {}

const container = document.querySelector('.container') as HTMLElement;

platform.bootstrap(PopupApp, container);
