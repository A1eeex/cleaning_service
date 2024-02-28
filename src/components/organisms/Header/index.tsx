import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';

const Header = () => {
  return (
    <div>
      <header className='flex justify-between p-2 px-4 bg-main-color'>
        <Logo />
        <Navigation />
      </header>
    </div>
  );
};

export default Header;
