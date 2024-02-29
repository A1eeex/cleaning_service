'use client';
import cn from 'classnames';
import CountItemButton from '@/components/atoms/CountItemButton';
import Modal from '@/components/atoms/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputForm from '@/components/atoms/InputForm';
import OrderForm from '@/components/molecules/OrderForm';
import Image from 'next/image';

//icons
import privateHouseIcon from '@/images/icons/privateHouse_icon.svg';

interface IFormInput {
  street: string;
  houseNumber: string;

  contactFullname: string;
  contactPhoneNumber: number;
  contactMail: string;
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
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);

  const [totalAmount, setTotalPrice] = useState<number>(100);

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

  //Icons

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
  };

  const calculateTotalPrice = () => {
    let price = totalAmount;

    if (isPrivateHouse) {
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
      setTotalPrice(100);
      setIsOpenCreateModal(false);
      console.log('Order created successfully:', res.data);
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      // console.log(err ? err.response.data.message : '');
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

  // useEffect(() => {

  // }, [isPrivateHouse]);
  return (
    <div>
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

            <label
              className={`flex items-center gap-2 w-fit border rounded-md p-2 transition-all duration-300 ${
                isPrivateHouse && ' bg-event-color border-main-color'
              }`}
              htmlFor='privateHouseCheckbox'
            >
              <div className='flex items-center text-lg font-bold gap-2'>
                <Image
                  priority
                  className='w-10'
                  src={privateHouseIcon}
                  alt='Private House icon'
                />
                {'Private House'}
                <span
                  className={`p-1 px-2 rounded-md transition-all duration-500
                    ${isPrivateHouse ? ' bg-event-color-active': 'bg-event-color'}
                  `}
                >
                  {' '}
                  x1.2
                </span>
              </div>
              <input
                id='privateHouseCheckbox'
                className='form-checkbox h-5 w-5 text-blue-500'
                onChange={handleCheckedIsPrivateHouse}
                type='checkbox'
                checked={isPrivateHouse}
              />
            </label>
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
        <div className='order-contenr-summary w-2/5'>
          <h2 className='sticky top-1'>
            total price: {calculateTotalPrice()}$
          </h2>
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
      {isLoadingCreateOrder && <p className='z-30'>Loading..</p>}

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
