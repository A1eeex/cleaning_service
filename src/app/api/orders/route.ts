import { NextResponse } from 'next/server';
import { connect } from '../../../../db';
import Order from '../../../../schemas/Order';
import { IOrder } from '@/interfaces/order/IOrder';

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
  try {
    const body = await request.json();
    console.log(body);
    await connect();
    const newOrder = new Order(body);
    await newOrder.save();
    return new NextResponse(
      JSON.stringify({ message: 'Order is created successfully', order: newOrder }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({
        message: `Error processing and ordering, please check whether all required fields are filled. Please try again or contact support.`,
      }),
      { status: 500 }
    );
  }
}
