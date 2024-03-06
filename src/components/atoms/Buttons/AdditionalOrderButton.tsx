import Image from 'next/image';

interface IAdditionalOrderButton {
  productTitle: string;
  productId: number;
  currentPrice: number;
  oldPrice: number | null;
  isOrdered: boolean;
  srcIcon: string;
  toggleAdditionalOrder: (productId: number) => void;
}

const AdditionalOrderButton: React.FC<IAdditionalOrderButton> = ({
  productTitle,
  productId,
  currentPrice,
  oldPrice,
  isOrdered,
  srcIcon,
  toggleAdditionalOrder,
}) => {
  return (
    <div
      onClick={() => toggleAdditionalOrder(productId)}
      key={productId}
      className={`w-custom-additional-order h-40 p-2 flex flex-col justify-center items-center rounded-md transition-all duration-300 ease-linear cursor-pointer   ${
        isOrdered ? 'bg-teal-600 hover:bg-teal-500' : 'bg-main-color bg-opacity-25 hover:bg-link-hover'
      }`}
    >
      <Image className='w-14 h-14' src={srcIcon} alt={productTitle} />
      <div>{productTitle}</div>
      <div
        className={`flex items-center gap-2 p-1 px-2  rounded-md transition-all duration-500
      ${isOrdered ? ' bg-event-color-active' : 'bg-event-color'}
    `}
      >
        <div className='text-lg'>{currentPrice}$</div>
        {oldPrice && (
          <div className='text-red-700 line-through text-sm font-bold'>{oldPrice}$</div>
        )}
      </div>
      <div className='h-2 w-2'>{isOrdered && '✅'}</div>
    </div>
  );
};

export default AdditionalOrderButton;
