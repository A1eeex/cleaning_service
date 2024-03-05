import { IAddress } from "./IAddress";
import { IContacts } from "./IContacts";

export interface IOrder {
    _id: string;
    status: 'new' | 'finished';
    address: IAddress;
    contacts: IContacts;
    privateHouse: boolean;
    roomsCount: number;
    bathroomCount: number;
    additionalOrders: string[] | null;
    totalAmount: number;
    createdAt: Date;
  }
  