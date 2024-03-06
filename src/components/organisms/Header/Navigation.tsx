'use client';

import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { HREF } from '../../../utils/globaVariables';
import Image from 'next/image';

//icons
import regularCleaningIcon from '@/images/icons/regularCleaning_icon.svg';
import repairCleaningIcon from '@/images/icons/repairCleaning_icon.svg';
import windowCleaningIcon from '@/images/icons/windowCleaning_icon.svg';
import adminIcon from '@/images/icons/admin_icon.svg';


const Navigation = () => {
  const pathname = usePathname();

  const navLink = [
    { name: 'Regular', href: HREF.regularPage, icon: regularCleaningIcon },
    { name: 'Repair', href: HREF.repairrPage, icon: repairCleaningIcon },
    { name: 'Window washing', href: '/windows', icon: windowCleaningIcon },
    { name: 'Admin', href: HREF.adminPage, icon: adminIcon },
  ];

  return (
    <nav className='flex items-center justify-center'>
      <ul className='flex flex-row gap-2'>
        {navLink.map(({ name, href, icon }) => (
          <li
            className={cn('header-navigation', {
              'bg-event-color hover:bg-event-color-active text-black':
                pathname === href,
              // 'bg-main-color ': pathname !== href,
            })}
            key={name}
          >
            <Link
              className='flex flex-col items-center justify-center text-[100%] lg:text-[1.5vw]'
              href={href}
            >
              <Image className='w-8 h-8' priority src={icon} alt={name + ' icon'} />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
