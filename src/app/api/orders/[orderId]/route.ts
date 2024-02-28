import { NextResponse } from 'next/server';
import data from '@/data.json';
import { RequestContext } from 'next/dist/server/base-server';

interface Context {
    params: {
      orderId: string;
    };
  }
export async function GET(request: Request, context:Context) {
  const { params } = context;

  const orders = data.find((order) => order.id.toString() === params.orderId);

  return NextResponse.json({
    orders
  });
}
