export interface IAddress {
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  region?: string;
  country?: string;
}

export class Address implements IAddress {
  public street: string;
  public houseNumber: string;
  public zipCode: string;
  public region: string;
  public country: string;

  public constructor(payload: IAddress) {
    this.street = payload.street || '';
    this.houseNumber = payload.houseNumber || '';
    this.zipCode = payload.zipCode || '';
    this.region = payload.region || '';
    this.country = payload.country || '';
  }
}
