import { NextResponse } from 'next/server';
import { connect } from '../../../../db';
import Order from '../../../../models/Order';
import { IOrder } from '@/interfaces/order/Order';

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

export async function POST(request: Request ) {
  try {
    const body = await request.json();
    console.log(body)
    await connect();
    const newOrder = new Order(body);
    await newOrder.save();
    return new NextResponse(
      JSON.stringify({ message: 'Order is created', order: newOrder }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: 'ERROR created order' }),
      { status: 500 }
    );
  }
}
