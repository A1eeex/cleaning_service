import { NextResponse } from 'next/server';
import { connect } from '../../../../db';
import Order from '../../../../modules/Order';
import { IOrder } from '@/interfaces/order/IOrder';
import Address from '../../../../modules/Address';

export async function GET() {
  try {
    await connect();
    const orders: IOrder[] = await Order.find();
    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(`error Fetching ${err}`, { status: 500 });
  }
}

export async function POST(request: Request) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = await request.json();
      console.log(body);
      await connect();

      const newAddress = new Address(body.address);
      const newOrder = new Order({ ...body, address: newAddress._id });
      // await newOrder.save();
      // await newAddress.save();
      await Promise.all([newOrder.save(), newAddress.save()]);
      resolve(
        new NextResponse(
          JSON.stringify({
            message: 'Order is created successfully',
            order: newOrder,
          }),
          { status: 201 }
        )
      );
    } catch (err: any) {
      console.error(err);
      reject(
        new NextResponse(
          JSON.stringify({
            message: `Error processing and ordering, please check whether all required fields are filled. Please try again or contact support.`,
          }),
          { status: 500 }
        )
      );
    }
  });
}
