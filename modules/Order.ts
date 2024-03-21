import { IContacts } from '@/interfaces/order/IContacts';
import { IOrder } from '@/interfaces/order/IOrder';
import mongoose from 'mongoose';

const { Schema } = mongoose;


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
      type: Schema.Types.ObjectId,
      // type: Schema.Types.Mixed,
      ref: 'Address',
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
