import { NextResponse } from 'next/server';
import data from '@/data.json';
import { RequestContext } from 'next/dist/server/base-server';
import { connect } from '../../../../../db';
import Order from '../../../../../schemas/Order';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

interface Context {
  params: {
    orderId: string;
  };
}

export async function DELETE(request: NextApiRequest,
  context: Context) {
  try {
    // const { id } = req.query;
    const id = context.params.orderId;
    
    console.log('ID received for deletion: ==========>>>', id);

    const orderToDelete = await Order.findById(id);
    console.log('Order to delete:==========>> ', orderToDelete); 
    if (!orderToDelete) {
      throw new Error('Order not found');
    }
    await connect();
    await Order.deleteOne(orderToDelete);

    return new NextResponse(
      JSON.stringify({ message: 'Order deleted successfully' }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    
    return new NextResponse(JSON.stringify({ error: 'Error deleting order555' }), {
      status: 500,
    });
  }
}
