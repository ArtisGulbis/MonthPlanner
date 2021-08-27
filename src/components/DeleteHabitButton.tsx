import React from 'react';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import DeleteButton from './DeleteButton';

interface Props {
  completed: boolean | 0 | undefined;
  dayNumber: number;
  dayId: string;
  habit: Habit;
}

const DeleteHabitButton = ({ dayId, completed, dayNumber, habit }: Props) => {
  const {
    dayStore,
    statisticsStore,
    monthStore: { currentDay },
  } = useStore();

  const deleteButtonStyles = (color: string) => {
    return `fill-current hover:text-${color}-500 cursor-pointer transform hover:scale-125 duration-75`;
  };

  const handleClick = async () => {
    dayStore.removeHabit(dayId, habit.id);
    statisticsStore.reduceCompletedCount(habit);
    statisticsStore.reduceHabitCount(habit);
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
