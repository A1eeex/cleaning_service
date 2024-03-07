import { NextResponse } from 'next/server';
import { connect } from '../../../../db';
import mongoose from 'mongoose';
import PromoCode, { promoCodeSchema } from '../../../../schemas/PromoCode';
import { IPromoCode } from '@/interfaces/promo-code/IPromoCode';

export async function GET() {
  try {
    await connect();

    const promoCodes: IPromoCode[] = await PromoCode.find({});
 
    return new NextResponse(JSON.stringify(promoCodes), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(`error Fetching ${err}`, { status: 500 });
  }
}
