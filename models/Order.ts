import { IAddress } from '@/interfaces/order/Address';
import { IOrder } from '@/interfaces/order/Order';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema <IAddress>({
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
  apartmentNumber: { type: String, required: true },
  entranceNumber: { type: String, required: false, default: null },
  floorNumber: { type: String, required: false, default: null },
  intercomCode: { type: Number, required: false, default: null },
});

const orderSchema = new Schema<IOrder>(
  {
    status: {
      type: String,
      enum: ['new', 'finished'],
      default: 'new',
    },
    privateHouse: {
      type: Boolean,
      default: false,
    },
    roomsCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },

    address: {
      type: addressSchema,
      required: true,
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>('Order', orderSchema);