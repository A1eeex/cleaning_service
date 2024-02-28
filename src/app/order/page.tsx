'use client';
import cn from 'classnames';
import CountItemButton from '@/components/atoms/CountItemButton';
import Modal from '@/components/atoms/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputForm from '@/components/atoms/InputForm';

interface IFormInput {
  street: string;
  houseNumber: string;
  apartmentNumber: string;
}

const OrderPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [roomsCount, setCountRooms] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(true);

  const [totalAmount, setTotalPrice] = useState<number>(100);

  const [street, setStreet] = useState<string>('1');
  const [houseNumber, setHouseNumber] = useState<string>('2');
  const [apartmentNumber, setApartmentNumber] = useState<string>('');
  const [floorNumber, setFloorNumber] = useState<string | null>(null);
  const [intercomCode, setIntercomCode] = useState<number | null>(null);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const decreaseRoomsCount = () => {
    if (roomsCount > 1) {
      setCountRooms((prev) => prev - 1);
      setTotalPrice((prev) => prev - 50);
    }
  };
  const incrementRooms = () => {
    setCountRooms((prev) => prev + 1);
    setTotalPrice((prev) => prev + 50);
  };
  const decreaseBathroomCount = () => {
    if (bathroomCount > 1) {
      setBathroomCount((prev) => prev - 1);
      setTotalPrice((prev) => prev - 30);
    }
  };

  const incrementBathroom = () => {
    setBathroomCount((prev) => prev + 1);
    setTotalPrice((prev) => prev + 30);
  };

  const handleCheckedIsPrivateHouse = () => {
    setIsPrivateHouse(!isPrivateHouse);
    calculateTotalPrice();
    console.log('isPrivateHouse');
    console.log(isPrivateHouse);
  };

  const calculateTotalPrice = () => {
    let price = totalAmount;

    if (!isPrivateHouse) {
      price = totalAmount * 1.2;
    } else {
      price = totalAmount;
    }
    return price;
  };

  const handlerCreateOrder = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const createOrder = {
      roomsCount,
      bathroomCount,
      totalAmount: calculateTotalPrice(),
      address: {
        street,
        houseNumber,
        apartmentNumber,
        floorNumber,
        intercomCode,
      },
    };

    try {
      const res = await axios.post(`/api/orders`, createOrder);
      console.log('Order created successfully:', res.data);
      setCountRooms(1);
      setBathroomCount(1);
      setTotalPrice(100);
      setIsOpenCreateModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const hanleCreateOrderBtn = (data: IFormInput) => {
    console.log(data);
    console.log('click');
    setIsOpenCreateModal(true);
  };

  return (
    <div>
      <h1>Клінінг клінінг</h1>
      <div className='flex align-middle gap-2'>
        <CountItemButton
          subtraction={decreaseRoomsCount}
          addition={incrementRooms}
          currentCount={roomsCount}
          titleOfCount='rooms'
        />
        <CountItemButton
          subtraction={decreaseBathroomCount}
          addition={incrementBathroom}
          currentCount={bathroomCount}
          titleOfCount='bathroom'
        />
        <div className='flex items-center gap-2'>
          <h3 className='text-lg font-bold'>Private House total x1.2</h3>
          <input
            className='form-checkbox h-5 w-5 text-blue-500'
            onChange={handleCheckedIsPrivateHouse}
            type='checkbox'
            checked={!isPrivateHouse}
          />
        </div>
      </div>
      <div className='bg-slate-400 p-4 rounded-lg'>
        <h3 className='text-xl font-semibold mb-2'>ВКАЖІТЬ ВАШУ АДРЕСУ</h3>
        <form className='flex flex-col gap-3'>
          <label className='flex flex-col'>
            <span className='text-sm'>Вулиця*:</span>
            <p className='error-message '>{errors.street?.message}</p>
            <input
              {...register('street', {
                required: 'Please wright your street',
                minLength: {
                  value: 4,
                  message: 'min length 4',
                },
              })}
              className={cn('form-input', {
                'form-input-error': errors.street,
              })}
              type='text'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </label>
          <InputForm
            type='text'
            label='Номер ЕУІЕ'
            name='houseNumber'
            register={register}
            validationRules={{
              required: 'Please write your house number',
              // minLength: {
              //   value: 1,
              //   message: 'min ddddd 3',
              // },
            }}
            value={houseNumber}
            onChangeFunction={(e) => setHouseNumber(e.target.value)}
            error={errors.houseNumber?.message}
          />
          {/* <label className='flex flex-col'>
            <span className='text-sm'>Номер будинку:</span>
            <p className='error-message '>{errors.houseNumber?.message}</p>
            <input
              {...register('houseNumber', {
                required: 'Please wright your house number',
              })}
              className={cn('form-input', {
                'form-input-error': errors.street,
              })}
              type='text'
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
          </label> */}

          <label className='flex flex-col'>
            <p className='error-message '>{errors.apartmentNumber?.message}</p>
            <span className='text-sm'>Номер квартири:</span>
            <input
              {...register('apartmentNumber', {
                required: 'Please wright your apartment number',
              })}
              className={cn('form-input', {
                'form-input-error': errors.apartmentNumber,
              })}
              type='text'
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-sm'>{`Номер під'їзду:`}</span>
            <input
              className='form-input'
              type='text'
              value={floorNumber !== null ? floorNumber : ''}
              onChange={(e) => setFloorNumber(e.target.value)}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-sm'>Поверх:</span>
            <input
              className='form-input'
              type='number'
              value={intercomCode !== null ? intercomCode : ''}
              onChange={(e) =>
                setIntercomCode(
                  e.target.value !== '' ? parseInt(e.target.value) : null
                )
              }
            />
          </label>
        </form>
      </div>

      <div>
        <h2>total price: {calculateTotalPrice()}$</h2>
      </div>

      <button
        onClick={handleSubmit(hanleCreateOrderBtn)}
        className={cn('border-2 border-solid border-indigo-600 bg-orange-200', {
          // 'bg-red-700': isSomeFormError,
        })}
      >
        {' '}
        Create order
      </button>

      {isOpenCreateModal && (
        <Modal
          title='Are you sure you want to buy?'
          cancelBtnTitle='Cancel'
          successBtnTitle='Buy'
          setIsOpenModal={setIsOpenCreateModal}
          onClickSuccess={handlerCreateOrder}
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

export default OrderPage;
