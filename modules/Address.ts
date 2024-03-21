import { IAddress } from "@/interfaces/order/IAddress";
import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    apartmentNumber: { type: String, default: null },
    entranceNumber: { type: String, required: false, default: null },
    floorNumber: { type: String, required: false, default: null },
    intercomCode: { type: Number, required: false, default: null },
  });

  export default mongoose.models.Address ||
  mongoose.model<IAddress>('Address', addressSchema);