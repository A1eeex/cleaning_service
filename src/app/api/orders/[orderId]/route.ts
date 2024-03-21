import { NextResponse } from 'next/server';
import { connect } from '../../../../../db';
import Order from '../../../../../modules/Order';
import { NextApiRequest, NextApiResponse } from 'next';

interface Context {
  params: {
    orderId: string;
  };
}

export async function DELETE(request: NextApiRequest,
  context: Context) {
  try {
    const id = context.params.orderId;

    const orderToDelete = await Order.findById(id);
    console.log('Order to delete:==>> ', orderToDelete); 
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
