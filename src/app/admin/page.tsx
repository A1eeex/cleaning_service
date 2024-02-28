'use client';

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { IOrder } from '../../../models/Order';
import Modal from '@/components/atoms/Modal';

const AdminPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);


  const handleCheckout = useCallback(() => {
    console.log('handleCheckout');

    setIsOpenModal(false);

    // navigate('./new_page');
  }, []);

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

      {isOpenModal && (
        <Modal
          title='Are you sure you want to buy?'
          cancelBtnTitle='Cancel'
          successBtnTitle='Buy'
          setIsOpenModal={setIsOpenModal}
          onClickSuccess={handleCheckout}
        >
          <p>
            After clicking the &apos;Buy&apos; button, your order will be
            processed.
          </p>
        </Modal>
      )}

    </div>
  );
};

export default AdminPage;
