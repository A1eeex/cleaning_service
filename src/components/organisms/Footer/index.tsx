import React from 'react';

const Footer = () => {
  const columns = [
    {
      title: 'CATEGORIES 1',
      links: ['First Link 1', 'Second Link 1', 'Third Link 1', 'Fourth Link 1'],
    },
    {
      title: 'CATEGORIES 2',
      links: ['First Link 2', 'Second Link 2', 'Third Link 2', 'Fourth Link 2'],
    },
    {
      title: 'CATEGORIES 3',
      links: ['First Link 3', 'Second Link 3', 'Third Link 3', 'Fourth Link 3'],
    },
    {
      title: 'CATEGORIES 4',
      links: ['First Link 4', 'Second Link 4', 'Third Link 4', 'Fourth Link 4'],
    },
    {
      title: 'CATEGORIES 5',
      links: ['First Link 5', 'Second Link 5', 'Third Link 5', 'Fourth Link 5'],
    },
    {
      title: 'CATEGORIES 6',
      links: ['First Link 6', 'Second Link 6', 'Third Link 6', 'Fourth Link 6'],
    },
  ];
  return (
    <footer className='text-gray-600 body-font border-t border-gray-200'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap md:text-left text-center -mb-10 -mx-4'>
          {columns.map((column, index) => (
            <div key={index} className='lg:w-1/6 md:w-1/2 w-full px-4'>
              <h2 className='title-font font-medium text-gray-900 tracking-widest text-sm mb-3'>
                {column.title}
              </h2>
              <nav className='list-none mb-10'>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a className='text-gray-600 hover:text-gray-800'>{link}</a>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    
      <div className='bg-gray-100'>
        <div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
          <p className='text-gray-500 text-sm text-center sm:text-left'>
            © 2024 -
            <a
              href='https://a1eeex.github.io/Portfolio/'
              className='text-gray-600 ml-1'
              target='_blank'
              rel='noopener noreferrer'
            >
              a1eeex.github
            </a>
          </p>
          <span className='inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto'>
            <a className='text-gray-500'>
              <svg
                fill='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
              </svg>
            </a>
            <a className='ml-3 text-gray-500'>
              <svg
                fill='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
              </svg>
            </a>
            <a className='ml-3 text-gray-500'>
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
                <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01'></path>
              </svg>
            </a>
            <a className='ml-3 text-gray-500'>
              <svg
                fill='currentColor'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='0'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='none'
                  d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'
                ></path>
                <circle cx='4' cy='4' r='2' stroke='none'></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
