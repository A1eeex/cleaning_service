import React, { ReactNode } from 'react';

interface IOrderForm {
  children: ReactNode;
  title?: string;
}

const OrderForm: React.FC<IOrderForm> = ({ children, title }) => {
  return (
    <div className='p-4 mt-2 border-t-2 border-dashed border-black' >
      {title && <h3 className='row-title'>{title}</h3>}
      <form className='flex flex-col gap-3'>{children}</form>
    </div>
  );
};

export default OrderForm;
