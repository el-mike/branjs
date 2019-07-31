import { IAddress } from './address.model';

export interface IProperty {
  internalName: string;
  internalDescription?: string;
  rooms?: number;
  size?: number;
  address?: IAddress;
}

export class Property implements IProperty {
  public internalName: string;
  public internalDescription: string;
  public rooms: number;
  public size: number;
  public address: IAddress;

  public constructor(payload: IProperty) {
    this.internalName = payload.internalName || '';
    this.internalDescription = payload.internalDescription || '';
    this.rooms = payload.rooms || null;
    this.size = payload.size || null;
    this.address = payload.address || {};
  }
}
