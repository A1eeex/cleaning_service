import React from 'react';
import pageUnderDevelopmentImg from '../../images/page_under_development.png'
import Image from 'next/image';
const RepairPage = () => {
    return (
        <div className='h-screen'>
           <Image src={pageUnderDevelopmentImg} alt='RepairPage'/> 
        </div>
    );
};

export default RepairPage;