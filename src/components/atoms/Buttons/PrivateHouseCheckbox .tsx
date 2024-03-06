import React from 'react';
import Image from 'next/image';
//icons
import privateHouseIcon from '@/images/icons/privateHouse_icon.svg';

interface IPrivateHouseCheckboxProps {
  title?: string;
  isPrivateHouse: boolean;
  handleCheckedIsPrivateHouse: () => void;
}

const PrivateHouseCheckbox: React.FC<IPrivateHouseCheckboxProps> = ({
  title,
  isPrivateHouse,
  handleCheckedIsPrivateHouse,
}) => {
  return (
    <label
      className={`flex items-center gap-2 p-2 w-fit border rounded-md transition-all duration-300 cursor-pointer ${
        isPrivateHouse && ' bg-event-color border-main-color'
      }`}
      htmlFor='privateHouseCheckbox'
    >
      <div className='flex items-center text-lg font-bold gap-2'>
        <Image
          priority
          className='w-10'
          src={privateHouseIcon}
          alt='Private House icon'
        />
        {title}
        <span
          className={`p-1 px-2 rounded-md transition-all duration-500
                    ${
                      isPrivateHouse
                        ? ' bg-event-color-active'
                        : 'bg-event-color'
                    }
                  `}
        >
          {' '}
          x1.2
        </span>
      </div>
      <input
        id='privateHouseCheckbox'
        className='form-checkbox h-5 w-5 text-blue-500'
        onChange={handleCheckedIsPrivateHouse}
        type='checkbox'
        checked={isPrivateHouse}
      />
    </label>
  );
};

export default PrivateHouseCheckbox;
