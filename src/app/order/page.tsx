'use client';
import cn from 'classnames';
import CountItemButton from '@/components/atoms/CountItemButton';
import Modal from '@/components/atoms/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputForm from '@/components/atoms/InputForm';
import OrderForm from '@/components/molecules/OrderForm';

import { calculateCleaningTimeRegular } from '@/utils/globalFunctons';
import { Loader } from '../../components/atoms/Loader';
import PrivateHouseCheckbox from '@/components/atoms/Buttons/PrivateHouseCheckbox ';
import {
  BASIC_PRICE_REGULAR_ORDER,
  PRICE_PER_ONE_BATHROOM_COLEANING,
  PRICE_PER_ONE_ROOM_COLEANING,
  additionalOrdersList,
} from '@/utils/globaVariables';
import { IFormInput } from '@/interfaces/order/IFormInput';
import Image from 'next/image';

const OrderPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [additionalOrdersDetalis, setAdditiOnalordersDetalis] =
    useState(additionalOrdersList);

  const [roomsCount, setCountRooms] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [additionalOptionCount, setAdditionalOptionCount] = useState<
    number | null
  >(null);
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);

  const [totalAmount, setTotalPrice] = useState<number>(
    BASIC_PRICE_REGULAR_ORDER
  );

  const [street, setStreet] = useState<string>('12');
  const [houseNumber, setHouseNumber] = useState<string>('22');
  const [apartmentNumber, setApartmentNumber] = useState<string | null>(null);
  const [floorNumber, setFloorNumber] = useState<string | null>(null);
  const [intercomCode, setIntercomCode] = useState<number | null>(null);

  const [contactFullname, setContactFullname] = useState<string | null>(null);
  const [contactPhoneNumber, setContactPhoneNumber] = useState<number | null>(
    null
  );
  const [contactMail, setContactMail] = useState<string | null>(null);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isLoadingCreateOrder, setIsLoadingCreateOrder] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const cleaningDetalis = calculateCleaningTimeRegular(
    roomsCount,
    bathroomCount,
    isPrivateHouse,
    additionalOptionCount
  );

  const findAdditionalorderIsAdded = additionalOrdersDetalis.filter(
    (order) => order.inOrder
  );
  const titleAdditionalorderIsAdded = findAdditionalorderIsAdded.map(
    (order) => order.title
  );
  console.log(titleAdditionalorderIsAdded);

  const decreaseRoomsCount = () => {
    if (roomsCount > 1) {
      setCountRooms((prev) => prev - 1);
      setTotalPrice((prev) => prev - PRICE_PER_ONE_ROOM_COLEANING);
    }
  };
  const incrementRooms = () => {
    setCountRooms((prev) => prev + 1);
    setTotalPrice((prev) => prev + PRICE_PER_ONE_ROOM_COLEANING);
  };

  const decreaseBathroomCount = () => {
    if (bathroomCount > 1) {
      setBathroomCount((prev) => prev - 1);
      setTotalPrice((prev) => prev - PRICE_PER_ONE_BATHROOM_COLEANING);
    }
  };

  const incrementBathroom = () => {
    setBathroomCount((prev) => prev + 1);
    setTotalPrice((prev) => prev + PRICE_PER_ONE_BATHROOM_COLEANING);
  };

  const handleCheckedIsPrivateHouse = () => {
    setIsPrivateHouse(!isPrivateHouse);
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    const countPrice = additionalOrdersDetalis.reduce(
      (acc, item) => (item.inOrder ? acc + item.price : acc),
      0
    );

    const basePrice = isPrivateHouse ? totalAmount * 1.2 : totalAmount;
    return basePrice + countPrice;
  };

  const handlerCreateOrder = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const createOrder = {
      roomsCount,
      bathroomCount,
      additionalOrders: titleAdditionalorderIsAdded,
      totalAmount: calculateTotalPrice(),
      privateHouse: isPrivateHouse,
      address: {
        street,
        houseNumber,
        apartmentNumber,
        floorNumber,
        intercomCode,
      },
      contacts: {
        fullName: contactFullname,
        phoneNumber: contactPhoneNumber,
        email: contactMail,
      },
    };

    try {
      setIsLoadingCreateOrder(true);
      const res = await axios.post(`/api/orders`, createOrder);
      setCountRooms(1);
      setBathroomCount(1);
      setTotalPrice(BASIC_PRICE_REGULAR_ORDER);
      setIsOpenCreateModal(false);
      console.log('Order created successfully:', res.data);
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      setIsOpenCreateModal(false);
    } finally {
      setIsLoadingCreateOrder(false);
    }
  };

  const hanleCreateOrderBtn = (data: IFormInput) => {
    console.log(data);
    console.log('click');
    setIsOpenCreateModal(true);
  };

  // Підрахунок кількості обраних елементів
  useEffect(() => {
    const countEach = additionalOrdersDetalis.reduce(
      (acc, item) => (item.inOrder ? acc + 1 : acc),
      0
    );

    setAdditionalOptionCount(countEach);

    console.log(countEach);
  }, [additionalOrdersDetalis]);

  const toggleAdditionalOrder = (id: number) => {
    setAdditiOnalordersDetalis((prevState) => {
      return prevState.map((detail) => {
        if (detail.id === id) {
          return { ...detail, inOrder: !detail.inOrder };
        }
        return detail;
      });
    });
  };
  return (
    <div className='px-8 py-8'>
      <div className='container-order-contenr flex w-full gap-4'>
        <div className='order-contenr-service w-3/5'>
          <h1>Клінінг клінінг</h1>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-3'>
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
            </div>

            <PrivateHouseCheckbox
              title='Private House'
              isPrivateHouse={isPrivateHouse}
              handleCheckedIsPrivateHouse={handleCheckedIsPrivateHouse}
            />
          </div>

          <div className='flex gap-2 flex-wrap justify-between w-full'>
            {additionalOrdersDetalis.map((item) => (
              <div
                onClick={() => toggleAdditionalOrder(item.id)}
                key={item.id}
                className={`w-custom p-2 flex flex-col justify-center items-center ${
                  item.inOrder ? 'bg-teal-600' : 'bg-main-color bg-opacity-25'
                }`}
              >
                <Image className='w-14 h-14' src={item.icon} alt={item.title} />
                <div>{item.title}</div>
                <div> item.inOrder: {item.inOrder ? 'yes' : 'no'}</div>
              </div>
            ))}
          </div>

          <OrderForm title='ВКАЖІТЬ ВАШУ АДРЕСУ'>
            <InputForm
              type='text'
              label='Вулиця:*'
              name='street'
              register={register}
              validationRules={{
                required: 'Please wright your street',
                minLength: {
                  value: 2,
                  message: 'Minimum 2 sumbols',
                },
              }}
              value={street}
              onChangeFunction={(e) => setStreet(e.target.value)}
              error={errors.street?.message}
            />
            <InputForm
              type='text'
              label='Номер будинку:*'
              name='houseNumber'
              register={register}
              validationRules={{
                required: 'Please write your house number',
              }}
              value={houseNumber}
              onChangeFunction={(e) => setHouseNumber(e.target.value)}
              error={errors.houseNumber?.message}
            />

            <InputForm
              type='text'
              label='Номер квартири:'
              name='apartmentNumber'
              value={apartmentNumber}
              onChangeFunction={(e) => setApartmentNumber(e.target.value)}
            />

            <InputForm
              type='text'
              label={`Номер під'їзду:`}
              name='floorNumber'
              value={floorNumber}
              onChangeFunction={(e) => setFloorNumber(e.target.value)}
            />

            <InputForm
              type='number'
              label='Поверх:'
              name='intercomCode'
              value={intercomCode}
              onChangeFunction={(e) =>
                setIntercomCode(
                  e.target.value !== '' ? parseInt(e.target.value) : null
                )
              }
            />
          </OrderForm>

          <OrderForm title='КОНТАКТНІ ДАНІ'>
            <InputForm
              type='text'
              label={`Ім'я та Прізвище`}
              name='contactFullname'
              register={register}
              validationRules={{
                required: 'Please wright your fullname',
                minLength: {
                  value: 3,
                  message: 'Minimum 3 sumbols',
                },
              }}
              value={contactFullname}
              onChangeFunction={(e) => setContactFullname(e.target.value)}
              error={errors.contactFullname?.message}
            />
            <InputForm
              type='tel'
              label={`Номер телефону`}
              name='contactPhoneNumber'
              register={register}
              validationRules={{
                required: 'Please wright your contact phone number',
                pattern: {
                  value: /^\d+$/,
                  message: 'Only numbers are allowed',
                },
                minLength: {
                  value: 9,
                  message: 'Minimum 9 sumbols',
                },
                maxLength: {
                  value: 12,
                  message: 'Max 12 sumbols',
                },
              }}
              value={contactPhoneNumber}
              onChangeFunction={(e) => {
                const value = e.target.value;
                // Перевірка, чи введено лише цифри
                if (/^\d*$/.test(value)) {
                  setContactPhoneNumber(value === '' ? null : parseInt(value));
                }
              }}
              error={errors.contactPhoneNumber?.message}
            />
            <InputForm
              type='email'
              label={`E-mail адреса`}
              name='contactMail'
              register={register}
              validationRules={{
                required: 'Enter email',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message:
                    'Enter a valid email address with domain@example.com',
                },
                minLength: {
                  value: 5,
                  message: 'Minimum 5 sumbols',
                },
                maxLength: {
                  value: 30,
                  message: 'Max 30 sumbols',
                },
              }}
              value={contactMail}
              placeholder='domain@example.com'
              onChangeFunction={(e) => {
                const value = e.target.value;
                setContactMail(value === '' ? null : value);
              }}
              error={errors.contactMail?.message}
            />
          </OrderForm>
        </div>
        <div className='order-contenr-summary w-2/5 '>
          <div className='sticky top-1'>
            <h2>total price: {calculateTotalPrice()}$</h2>
            <p>
              {' '}
              Приблизний час прибирання: {cleaningDetalis.hours} годин{' '}
              {cleaningDetalis.minutes} хвилин
            </p>
            <p> кількість працівників: {cleaningDetalis.numberOfCleaners} </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit(hanleCreateOrderBtn)}
        className={cn('border-2 border-solid border-indigo-600 bg-orange-200', {
          // 'bg-red-700': isSomeFormError,
        })}
      >
        {' '}
        {`Create order for ${calculateTotalPrice()}$`}
      </button>

      {/* MODALS */}

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

      {isLoadingCreateOrder && <Loader />}

      {errorMessage && (
        <Modal
          title='Somting wrong!!!'
          cancelBtnTitle='Cancel'
          successBtnTitle='Ok'
          setIsOpenModal={() => setErrorMessage('')}
          onClickSuccess={() => setErrorMessage('')}
        >
          <p>{errorMessage}</p>
        </Modal>
      )}
    </div>
  );
};

export default OrderPage;
