export const BASIC_PRICE_REGULAR_ORDER = 100;
export const PRICE_PER_ONE_ROOM_COLEANING = 50;
export const PRICE_PER_ONE_BATHROOM_COLEANING = 30;

//icons
import ovenIcon from '@/images/icons/additionalOrders/oven_icon.svg';
import hoodIcon from '@/images/icons/additionalOrders/hood_icon.svg';
import kitchenCabinetsIcon from '@/images/icons/additionalOrders/kitchen_cabinets_icon.svg';
import washingUp from '@/images/icons/additionalOrders/washing-up.svg';

export const HREF = {
  mainPage: '/',
  regularPage: '/order',
  repairrPage: '/repair',
  adminPage: '/admin',
  login: '/login',
  register: '/register',
};

export const additionalOrdersList = [
  {
    id: 1,
    title: 'Cleaning the oven',
    icon: ovenIcon,
    isOrdered: true,
    currentPrice: 10,
    oldPrice: 15,
  },
  {
    id: 2,
    title: 'Hood washing',
    icon: hoodIcon,
    isOrdered: false,
    currentPrice: 15,
    oldPrice: 20,
  },
  {
    id: 3,
    title: 'Cleaning in kitchen cabinets',
    icon: kitchenCabinetsIcon,
    isOrdered: false,
    currentPrice: 30,
    oldPrice: null,
  },
  {
    id: 4,
    title: 'Washing-up',
    icon: washingUp,
    isOrdered: false,
    currentPrice: 15,
    oldPrice: 20,
  },
];
