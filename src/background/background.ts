import { ChromeAPI } from '@common/models';

const testProperty1 = {
  internalName: 'Michal Test Property 1',
  internalDescription: 'First Property for testing purposes',
  rooms: 8,
  size: 80,
  address: {
    street: 'Grimm',
    houseNumber: 8,
    zipCode: '20457',
    city: 'Hamburg',
    region: 'Hamburg',
    country: 'Deutschland'
  }
};

const testProperty2 = {
  internalName: 'Michal Test Property 2',
  internalDescription: 'First Property for testing purposes',
  rooms: 8,
  size: 80,
  address: {
    street: 'Grimm',
    houseNumber: 8,
    zipCode: '20457',
    city: 'Hamburg',
    region: 'Hamburg',
    country: 'Deutschland'
  }
};

const testProperty3 = {
  internalName: 'Michal Test Property 3',
  internalDescription: 'First Property for testing purposes',
  rooms: 8,
  size: 80,
  address: {
    street: 'Grimm',
    houseNumber: 8,
    zipCode: '20457',
    city: 'Hamburg',
    region: 'Hamburg',
    country: 'Deutschland'
  }
};

export class Background {
  public constructor(
    private runtime: ChromeAPI.Runtime,
    private storage: ChromeAPI.Storage,
    private declarativeContent: ChromeAPI.DeclarativeContent,
  ) {}

  public init() {
    this.runtime.onInstalled.addListener(() => {
      this.setInitialData([testProperty1, testProperty2, testProperty3]);
      this.setPageChangeRules();
    });
  }

  private setInitialData(data: any) {
    this.storage.sync.set({
      properties: data,
    });
  }

  private setPageChangeRules() {
    this.declarativeContent.onPageChanged.removeRules(undefined, () => {
      this.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new this.declarativeContent.PageStateMatcher({
              pageUrl: { hostContains: 'immomio.com' },
            })
          ],
          actions: [
            new this.declarativeContent.ShowPageAction()
          ]
        }
      ])
    });
  }
}
