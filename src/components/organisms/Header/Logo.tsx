import Link from 'next/link';
import React from 'react';
import { HREF } from '../../../utils/globaVariables';
import logoImg from '@/images/logoMrCleaner.png'
import Image from 'next/image';
const Logo = () => {
  return <Link href={HREF.mainPage}><Image className='w-28' src={logoImg} alt='logo'/></Link>;
};

export default Logo;
