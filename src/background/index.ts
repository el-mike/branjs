import { Background } from './background';

const chromeApi = chrome;

const background = new Background(
  chromeApi.runtime,
  chromeApi.storage,
  chromeApi.declarativeContent
);

background.init();
