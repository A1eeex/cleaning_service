import { IPromoCode } from '@/interfaces/promo-code/IPromoCode';
import mongoose, { Schema } from 'mongoose';

export const promoCodeSchema = new Schema<IPromoCode>({
  title: { type: String, required: true },
  discount: { type: Number, required: true },
});
export default mongoose.models.PromoCode || mongoose.model<IPromoCode>('PromoCode', promoCodeSchema, 'promo-codes');