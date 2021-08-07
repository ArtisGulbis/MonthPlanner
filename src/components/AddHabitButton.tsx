import React from 'react';
import { Day } from '../models/day';
import { useStore } from '../stores/store';
import { checkAllCompletedHabits } from '../utils/utils';

interface Props {
  day: Day;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

const AddHabitButton = ({ day, handleSubmit }: Props) => {
  const {
    monthStore: { currentDay },
  } = useStore();

  const buttonStyles = (color: string) => {
    return `fill-current text-${color}-700 hover:text-${color}-500 cursor-pointer transform hover:scale-150 duration-75`;
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-grow-0 rounded-r-md ml-4 mr-2
    ${
      checkAllCompletedHabits(day)
        ? buttonStyles('green')
        : currentDay === day.dayNumber
        ? buttonStyles('pink')
        : buttonStyles('yellow')
    }

          `}
      viewBox="0 0 20 20"
      onClick={() => handleSubmit()}
      type="submit"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default AddHabitButton;
