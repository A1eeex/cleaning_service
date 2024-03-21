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
  // const cleaningDate = (cleaningDate:any) => new Date(cleaningDate);
  useEffect(() => {
    getAllOrders();
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      console.log(orderId);
      await axios.delete(`/api/orders/${orderId}`);
      getAllOrders();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  return (
    <div className='grid gap-4'>
      {orders.length > 0 ? (
        <>
          {orders.map((order) => (
            <div
              key={order._id}
              className='p-6 rounded-md shadow-md bg-gray-100'
            >
              <ul>
                <li className='font-semibold'>ID: {order._id}</li>
                <li>Status: {order.status}</li>
                <li>Total Amount: {order.totalAmount}</li>
                <li>Rooms Count: {order.roomsCount}</li>
                <li>Bathroom Count: {order.bathroomCount}</li>
                <li>Private House: {order.privateHouse ? 'Yes' : 'No'}</li>
                <li>
                  Created At: {new Date(order.createdAt).toLocaleString()}
                </li>
                <li className='flex items-center'>
                  Cleaning Date:
                  <div className='ml-2'>
                    <span>Date:</span>{' '}
                    {new Date(order.cleaningDate).toLocaleDateString()}
                  </div>
                  <div className='ml-2'>
                    <span>Time:</span>{' '}
                    {new Date(order.cleaningDate).toLocaleTimeString()}
                  </div>
                </li>
              </ul>
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none'
              >
                Delete Order
              </button>
            </div>
          ))}
        </>
      ) : (
        <div>empty</div>
      )}
    </div>
  );
};

export default AdminPage;
