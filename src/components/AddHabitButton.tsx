import React from 'react';

interface Props {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

const AddHabitButton = ({ handleSubmit }: Props) => {
  const buttonStyles = () => {
    return `fill-current text-blue-700 hover:text-blue-500 cursor-pointer transform hover:scale-125 duration-75`;
  };

  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={`flex-grow-0 rounded-r-md ml-2 mr-2 ${buttonStyles()}`}
    //   viewBox="0 0 20 20"
    //   onClick={() => handleSubmit()}
    //   type="submit"
    // >
    //   <path
    //     fillRule="evenodd"
    //     d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    //     clipRule="evenodd"
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-grow-0 rounded-r-md ml-2 mr-2 ${buttonStyles()}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      onClick={() => handleSubmit()}
      type="submit"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default AddHabitButton;
