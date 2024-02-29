import React, { FC, ReactNode } from 'react';

interface ModalProps {
  setIsOpenModal: (state: boolean) => void;
  title: string;
  children: ReactNode;
  successBtnTitle: string;
  cancelBtnTitle: string;
  onClickSuccess: (event: React.MouseEvent<HTMLButtonElement>) => void;
  bottomButtons?: boolean;
}

const Modal: FC<ModalProps> = ({
  setIsOpenModal,
  title,
  children,
  successBtnTitle,
  cancelBtnTitle,
  onClickSuccess,
  bottomButtons = true,
}) => {
  const hanlerCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-75 backdrop-blur">
      <div className="relative flex flex-col w-96 p-6 bg-purple-900 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button
            className="p-2 text-white bg-red-600 rounded-md"
            onClick={hanlerCloseModal}
          >
            X
          </button>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-white">{title}</h1>

        <form>
          {children}
          {bottomButtons && (
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 mr-4 text-white bg-gray-600 rounded-md hover:border-purple-600 hover:text-purple-600"
                onClick={hanlerCloseModal}
              >
                {cancelBtnTitle}
              </button>
              <button
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:border-green-700 hover:text-purple-600"
                onClick={onClickSuccess}
              >
                {successBtnTitle}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
