'use client';
import cn from 'classnames';
import CountItemButton from '@/components/atoms/CountItemButton';
import Modal from '@/components/atoms/Modal';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputForm from '@/components/atoms/InputForm';
import OrderForm from '@/components/molecules/OrderForm';

import {
  calculateCleaningTimeRegular,
  calculateTotalPrice,
} from '@/utils/globalFunctons';
import { Loader } from '../../components/atoms/Loader';
import PrivateHouseCheckbox from '@/components/atoms/Buttons/PrivateHouseCheckbox ';
import {
  BASIC_PRICE_REGULAR_ORDER,
  PRICE_PER_ONE_BATHROOM_COLEANING,
  PRICE_PER_ONE_ROOM_COLEANING,
  additionalOrdersList,
} from '@/utils/globaVariables';
import { IFormInput } from '@/interfaces/order/IFormInput';
import AdditionalOrderButton from '@/components/atoms/Buttons/AdditionalOrderButton';

import cancelIcon from '@/images/icons/cancelBtn_icon.svg';
import Image from 'next/image';
import { IPromoCode } from '@/interfaces/promo-code/IPromoCode';
import { IAdditionalOrder } from '@/interfaces/order/IAdditionalOrder';
const OrderPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [discountProc, setDiscountProc] = useState<number>(0);
  const [promoCodes, setPromoCodes] = useState<IPromoCode[]>([]);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [roomsPriceTotalAmount, setRoomsPriceTotalAmount] = useState<number>(
    BASIC_PRICE_REGULAR_ORDER
  );
  const [mainTotalOrderPrice, setMainTotalOrderPrice] = useState<number>(
    roomsPriceTotalAmount
  );

  const [additionalOrdersDetalis, setAdditiOnalordersDetalis] =
    useState<IAdditionalOrder[]>(additionalOrdersList);

  const [roomsCount, setCountRooms] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [additionalOptionCount, setAdditionalOptionCount] = useState<
    number | null
  >(null);
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);

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

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isCreateOrderSuccessModal, setIsCreateOrderSuccessModal] =
    useState<boolean>(false);
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
    (order) => order.isOrdered
  );
  const titleAdditionalorderIsAdded = findAdditionalorderIsAdded.map(
    (order) => order.title
  );

  useEffect(() => {
    const totalPrice = calculateTotalPrice(
      isPrivateHouse,
      roomsPriceTotalAmount,
      additionalOrdersDetalis,
      discountProc
    );
    // Підрахунок кількості обраних елементів
    const countEach = additionalOrdersDetalis.reduce(
      (acc, item) => (item.isOrdered ? acc + 1 : acc),
      0
    );

    setAdditionalOptionCount(countEach);

    setMainTotalOrderPrice(totalPrice);
  }, [roomsPriceTotalAmount, isPrivateHouse, additionalOrdersDetalis]);

  const decreaseRoomsCount = () => {
    if (roomsCount > 1) {
      setCountRooms((prev) => prev - 1);
      setRoomsPriceTotalAmount((prev) => prev - PRICE_PER_ONE_ROOM_COLEANING);
    }
  };
  const incrementRooms = () => {
    setCountRooms((prev) => prev + 1);
    setRoomsPriceTotalAmount((prev) => prev + PRICE_PER_ONE_ROOM_COLEANING);
  };

  const decreaseBathroomCount = () => {
    if (bathroomCount > 1) {
      setBathroomCount((prev) => prev - 1);
      setRoomsPriceTotalAmount(
        (prev) => prev - PRICE_PER_ONE_BATHROOM_COLEANING
      );
    }
  };

  const incrementBathroom = () => {
    setBathroomCount((prev) => prev + 1);
    setRoomsPriceTotalAmount((prev) => prev + PRICE_PER_ONE_BATHROOM_COLEANING);
  };

  const handleCheckedIsPrivateHouse = () => {
    setIsPrivateHouse(!isPrivateHouse);
    setMainTotalOrderPrice(
      calculateTotalPrice(
        isPrivateHouse,
        roomsPriceTotalAmount,
        additionalOrdersDetalis
      )
    );
    // calculateTotalPrice();
  };

  const handlerCreateOrder = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const createOrder = {
      roomsCount,
      bathroomCount,
      additionalOrders: titleAdditionalorderIsAdded,
      totalAmount: calculateTotalPrice(
        isPrivateHouse,
        roomsPriceTotalAmount,
        additionalOrdersDetalis,
        discountProc
      ),
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
      setRoomsPriceTotalAmount(BASIC_PRICE_REGULAR_ORDER);
      setIsOpenCreateModal(false);
      console.log('Order created successfully:', res.data);
      setIsCreateOrderSuccessModal(true);
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

  const toggleAdditionalOrder = (id: number) => {
    setAdditiOnalordersDetalis((prevState) => {
      return prevState.map((detail) => {
        if (detail.id === id) {
          return { ...detail, isOrdered: !detail.isOrdered };
        }
        return detail;
      });
    });
  };

  const getAllPromoCodes = async () => {
    try {
      const responce = await axios.get('api/promo-codes');
      setPromoCodes(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPromoCodes();
  }, []);

  const handleSubmitPromoCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCorrectPomocode = promoCodes.find(
      (code) => code.title === promoCodeInput
    );

    if (isCorrectPomocode) {
      console.log('yes');
      setDiscountProc(isCorrectPomocode.discount);
      
      setMainTotalOrderPrice(
        calculateTotalPrice(
          isPrivateHouse,
          roomsPriceTotalAmount,
          additionalOrdersDetalis,
          discountProc
        )
      );
    } else {
      console.log('no');
    }
  };

  console.log('yo>=> ', mainTotalOrderPrice);

  return (
    <div className='px-8 py-8'>
      <div className='container-order-contenr flex w-full gap-4'>
        <div className='order-contenr-service w-3/5'>
          <h1 className='row-title'>Ваша квартира</h1>
          <div className='flex flex-col gap-2 py-4'>
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
            <div className='flex items-center justify-center mt-2'>
              <PrivateHouseCheckbox
                title='Private House'
                isPrivateHouse={isPrivateHouse}
                handleCheckedIsPrivateHouse={handleCheckedIsPrivateHouse}
              />
            </div>
          </div>

          <div className='flex gap-2 flex-wrap justify-between w-full py-4'>
            {additionalOrdersDetalis.map((item) => (
              <React.Fragment key={item.id}>
                <AdditionalOrderButton
                  currentPrice={item.currentPrice}
                  isOrdered={item.isOrdered}
                  oldPrice={item.oldPrice}
                  productId={item.id}
                  productTitle={item.title}
                  toggleAdditionalOrder={() => toggleAdditionalOrder(item.id)}
                  srcIcon={item.icon}
                />
              </React.Fragment>
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
        <div className='order-contenr-summary w-2/5'>
          <div className='sticky top-1 p-4 bg-gray-300 bg-opacity-30 rounded-lg shadow-md'>
            <h2 className='font-bold text-xl mb-4'>
              {`Прибирання квартири з ${roomsCount} ${
                roomsCount > 1 ? 'житловими' : 'житловою'
              } та ${bathroomCount} ${
                bathroomCount > 1 ? 'ванними кімнатами' : 'ванною кімнатою'
              }, кухня, коридор`}{' '}
            </h2>
            <p className='mb-2'>
              Приблизний час прибирання: {cleaningDetalis.hours}{' '}
              {cleaningDetalis.hours === 1
                ? 'година'
                : cleaningDetalis.hours >= 2 && cleaningDetalis.hours <= 4
                ? 'години'
                : 'годин'}
              {cleaningDetalis.minutes !== 0 &&
                `, ${cleaningDetalis.minutes} хвилин`}
            </p>

            <p className='mb-2'>
              Клількість працівників: {cleaningDetalis.numberOfCleaners}
            </p>

            <div>
              {findAdditionalorderIsAdded.length > 0 && (
                <>
                  <p className='font-bold mb-2'>Додаткові послуги:</p>
                  {findAdditionalorderIsAdded.map((order) => (
                    <div
                      key={order.id}
                      className='flex items-center justify-between border-b border-gray-300 py-2'
                    >
                      <span className='text-main-color'>{order.title}</span>
                      <div
                        className='cursor-pointer text-red-500'
                        onClick={() => toggleAdditionalOrder(order.id)}
                      >
                        <Image
                          className='w-5 opacity-50 hover:opacity-100 transition-all duration-300 ease-linear'
                          src={cancelIcon}
                          alt='cancelIcon'
                        ></Image>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <p className='mt-4 mb-2'>
              Total price:{' '}
              <span className='font-bold'>{mainTotalOrderPrice}$</span>{' '}
            </p>

            <form
              onSubmit={handleSubmitPromoCode}
              className='flex items-center'
            >
              <label className='w-1/5 mr-2' htmlFor='promoCode'>
                Промокод:
              </label>
              <input
                type='text'
                id='promoCode'
                value={promoCodeInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPromoCodeInput(e.target.value)
                }
                placeholder='Введіть промокод'
                className='w-3/5 mr-2 p-2 border border-gray-300 rounded-md'
              />
              <button
                type='submit'
                className='w-1/5 bg-blue-500 text-white py-2 px-4 rounded-md'
              >
                Використати
              </button>
            </form>

            <button
              onClick={handleSubmit(hanleCreateOrderBtn)}
              className={cn(
                'text-white bg-main-color px-4 py-2 rounded-lg hover:bg-success-color hover:text-black transition-all duration-300 ease-linear',
                {
                  // 'bg-red-700': isSomeFormError,
                }
              )}
            >
              {`Create order`}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------MODALS------------ */}

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

      {isCreateOrderSuccessModal && (
        <Modal
          title='Success!'
          bottomButtons={false}
          setIsOpenModal={() => setIsCreateOrderSuccessModal(false)}
        >
          <p>Your order Created!</p>
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
