import { Document } from "mongodb";

export interface IAddress extends Document {
    street: string;
    houseNumber: string;
    apartmentNumber: string;
    entranceNumber?: string | null;
    floorNumber?: string | null;
    intercomCode?: number | null;
  }
  