import React, { FC } from 'react';

type Props = {
  titleOfCount: string;
  currentCount: number;
  subtraction: () => void;
  addition: () => void;
};

const CountItemButton: FC<Props> = ({
  titleOfCount,
  currentCount,
  subtraction,
  addition,
}) => {
  return (
    <div>
      <div className='custom-number-input h-10 inline-block'>
        <div className='flex flex-row h-10 w-80 rounded-lg relative bg-transparent mt-1'>
          <button
            data-action='decrement'
            className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none'
            onClick={subtraction}
          >
            <span className='m-auto text-2xl font-thin'>−</span>
          </button>
          <div className='flex px-1 w-full align-middle justify-center focus:outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default items-center text-gray-700  outline-none'>
            {`${currentCount} ${titleOfCount}`}
          </div>
          <button
            data-action='addition'
            className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer'
            onClick={addition}
          >
            <span className='m-auto text-2xl font-thin'>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountItemButton;
