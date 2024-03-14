import React from 'react';
import pageUnderDevelopmentImg from '../../images/page_under_development.png';
import Image from 'next/image';
const WindowsPage = () => {
  return (
    <div>
      <div className='h-screen'>
        <Image src={pageUnderDevelopmentImg} alt='RepairPage' />
      </div>
    </div>
  );
};

export default WindowsPage;
