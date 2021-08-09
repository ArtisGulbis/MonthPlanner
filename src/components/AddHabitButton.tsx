import React from 'react';
import { buttonStyles } from '../utils/utils';

interface Props {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  styling?: string;
}

const AddHabitButton = ({ handleSubmit, styling }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-r-md ${buttonStyles('blue')} ${styling}`}
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
