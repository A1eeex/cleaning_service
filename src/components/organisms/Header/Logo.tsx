import Link from 'next/link';
import React from 'react';
import { HREF } from '../../../utils/globaVariables';

const Logo = () => {
  return <Link href={HREF.mainPage}>LoGO</Link>;
};

export default Logo;
