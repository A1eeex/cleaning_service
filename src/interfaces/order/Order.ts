import { IAddress } from "./Address";

export interface IOrder {
    _id: string;
    status: 'new' | 'finished';
    privateHouse: boolean;
    roomsCount: number;
    bathroomCount: number;
    totalAmount: number;
    address: IAddress;
    createdAt: Date;
  }
  