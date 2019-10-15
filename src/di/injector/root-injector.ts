import { Injector } from './injector';

export class RootInjector extends Injector { 
  private static _instance: RootInjector;

  private constructor() {
    super(null);
  }

  public static getInstance() {
    if (!RootInjector._instance) {
      RootInjector._instance = new RootInjector();
    }

    return RootInjector._instance;
  }
}
