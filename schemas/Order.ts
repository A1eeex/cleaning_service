import { IAddress } from '@/interfaces/order/IAddress';
import { IContacts } from '@/interfaces/order/IContacts';
import { IOrder } from '@/interfaces/order/IOrder';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
  apartmentNumber: { type: String, default: null },
  entranceNumber: { type: String, required: false, default: null },
  floorNumber: { type: String, required: false, default: null },
  intercomCode: { type: Number, required: false, default: null },
});

const contactsSchema = new Schema<IContacts>({
  fullName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, default: null },
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

    address: {
      type: addressSchema,
      required: true,
    },
    contacts: {
      type: contactsSchema,
      required: true,
    },
    roomsCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    additionalOrders: {
      type: [String], 
      default: [],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    cleaningDate: {
      type: Date,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>('Order', orderSchema);
