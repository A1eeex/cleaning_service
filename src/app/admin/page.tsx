'use client';

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from '@/components/atoms/Modal';
import { IOrder } from '@/interfaces/order/IOrder';

const AdminPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getAllOrders = async () => {
    try {
      const responce = await axios.get('api/orders');
      setOrders(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className='flex flex-col gap-3'>
      {orders.map((order) => (
        <ul key={order._id} className='bg-orange-300'>
          <li>id:{order._id}</li>
          <li>status:{order.status}</li>
          <li>totalAmount:{order.totalAmount}</li>
          <li>roomsCount:{order.roomsCount}</li>
          <li>bathroomCount:{order.bathroomCount}</li>
          <li>privateHouse:{order.privateHouse ? 'Yes' : 'No'}</li>
          <li>createdAt:{order.createdAt.toLocaleString()}</li>
        </ul>
      ))}

    </div>
  );
};

export default AdminPage;
