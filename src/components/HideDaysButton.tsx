import React from 'react';

interface Props {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const HideDaysButton = ({ hidden, setHidden }: Props) => {
  return (
    <div className="hideButton absolute left-0">
      <button
        onClick={() => setHidden(!hidden)}
        className="bg-red-300 text-red-800 hover:bg-red-600 hover:text-red-200 p-3 rounded-md text-lg transform duration-75 hover:scale-105"
      >
        {hidden ? (
          <p className="flex flex-row justify-items-center items-center">
            Show hidden days
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        ) : (
          <p className="flex flex-row justify-center items-center">
            Hide passed days
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        )}
      </button>
    </div>
  );
};

export default HideDaysButton;
