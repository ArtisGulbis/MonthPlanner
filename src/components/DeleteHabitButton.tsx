import React from 'react';
import { Habit } from '../generated/graphql';
import habitService from '../services/habitService/habitService';
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
    monthStore: { currentDay },
  } = useStore();

  const deleteButtonStyles = (color: string) => {
    return `fill-current hover:text-${color}-500 cursor-pointer transform hover:scale-125 duration-75`;
  };

  const handleClick = () => {
    // reduceCompletedCount(habit);
    // reduceHabitCount(habit);
    dayStore.removeHabit(dayId, habit.id);
    habitService.deleteHabit(habit.id);
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
