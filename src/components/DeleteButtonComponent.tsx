import React from 'react';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';

interface Props {
  completed: boolean | 0;
  dayNumber: number;
  habit: Habit;
}

const DeleteButtonComponent = ({ completed, dayNumber, habit }: Props) => {
  const {
    habitStore: { removeHabit },
    statisticsStore: { reduceHabitCount, reduceCompletedCount },
    monthStore: { currentDay },
  } = useStore();

  const deleteButtonStyles = (color: string) => {
    return `fill-current hover:text-${color}-500 cursor-pointer`;
  };

  return (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className={`h-10 w-10 mr-2 ${
    //         completed
    //           ? deleteButtonStyles('green')
    //           : currentDay === dayNumber
    //           ? deleteButtonStyles('pink')
    //           : deleteButtonStyles('yellow')
    //       }`}
    //       onClick={(e) => {
    //         reduceCompletedCount(habit);
    //         reduceHabitCount(habit);
    //         removeHabit(habit.dayId, habit.id);
    //       }}
    //       viewBox="0 0 20 20"
    //       fill="currentColor"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-10 w-10 mr-2 ${
        completed
          ? deleteButtonStyles('green')
          : currentDay === dayNumber
          ? deleteButtonStyles('pink')
          : deleteButtonStyles('yellow')
      }`}
      onClick={(e) => {
        reduceCompletedCount(habit);
        reduceHabitCount(habit);
        removeHabit(habit.dayId, habit.id);
      }}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default DeleteButtonComponent;