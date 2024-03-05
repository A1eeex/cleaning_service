export const BASIC_PRICE_REGULAR_ORDER = 100;
export const PRICE_PER_ONE_ROOM_COLEANING = 50;
export const PRICE_PER_ONE_BATHROOM_COLEANING = 30;

//icons
import ovenIcon from '@/images/icons/additionalOrders/oven_icon.svg';
import hoodIcon from '@/images/icons/additionalOrders/hood_icon.svg';
import kitchenCabinetsIcon from '@/images/icons/additionalOrders/kitchen_cabinets_icon.svg';

export const HREF = {
  mainPage: '/',
  regularPage: '/order',
  repairrPage: '/repair',
  adminPage: '/admin',
};

export const additionalOrdersList = [
  {
    id: 1,
    title: 'Cleaning the oven',
    icon: ovenIcon,
    inOrder: true,
    price: 10,
  },
  { id: 2, title: 'Hood washing', icon: hoodIcon, inOrder: false, price: 15 },
  {
    id: 3,
    title: 'Cleaning in kitchen cabinets',
    icon: kitchenCabinetsIcon,
    inOrder: false,
    price: 30,
  },
  {
    id: 4,
    title: 'Cleaning in kitchen cabinets',
    icon: kitchenCabinetsIcon,
    inOrder: false,
    price: 30,
  },
];
