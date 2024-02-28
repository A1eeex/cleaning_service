
'use client'

import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { HREF } from '../../../utils/globaVariables';

const Navigation = () => {

  const pathname = usePathname();

  const navLink = [
    { name: 'Regular', href: HREF.regularPage },
    { name: 'Repair', href: HREF.repairrPage },
    { name: 'Window washing', href: '/windows' },
    { name: 'Admin', href: HREF.adminPage },
  ];

  return (
    <nav>
      <ul className='flex flex-row gap-2'>
        {navLink.map(({ name, href }) => (
          <li
            className={cn('header-navigation', {
              'bg-event-color-active hover:bg-event-color-active': pathname === href,
              // 'bg-main-color ': pathname !== href,
            })}
            key={name}
          >
            <Link className='text-[100%] lg:text-[1.5vw]' href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
