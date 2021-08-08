import React from 'react';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import DeleteButton from './DeleteButton';

interface Props {
  completed: boolean | 0;
  dayNumber: number;
  habit: Habit;
}

const DeleteHabitButton = ({ completed, dayNumber, habit }: Props) => {
  const {
    dayStore: { removeHabit },
    statisticsStore: { reduceHabitCount, reduceCompletedCount },
    monthStore: { currentDay },
  } = useStore();

  const deleteButtonStyles = (color: string) => {
    return `fill-current hover:text-${color}-500 cursor-pointer transform hover:scale-125 duration-75`;
  };

  const handleClick = () => {
    reduceCompletedCount(habit);
    reduceHabitCount(habit);
    removeHabit(habit.dayId, habit.id);
  };

  return (
    <DeleteButton
      styling={`h-10 w-10 mr-2 ${
        completed
          ? deleteButtonStyles('green')
          : currentDay === dayNumber
          ? deleteButtonStyles('pink')
          : deleteButtonStyles('yellow')
      }`}
      onClick={handleClick}
    />
  );
};

export default DeleteHabitButton;
