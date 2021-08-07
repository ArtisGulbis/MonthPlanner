import { observer } from 'mobx-react-lite';
import React from 'react';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import { shortenText } from '../utils/utils';
import Checkbox from './Checkbox';
import DeleteHabitButton from './DeleteHabitButton';

interface Props {
  habit: Habit;
  passed: boolean;
  completed: boolean | 0;
  dayNumber: number;
}

const HabitEntry = ({ habit, passed, completed, dayNumber }: Props) => {
  const {
    monthStore: { currentDay },
  } = useStore();

  return (
    <div
      className={`w-full flex items-center shadow-inner rounded-r-md rounded-l-md habit h-10 ml-2 ${
        completed
          ? 'bg-green-200'
          : currentDay === dayNumber
          ? 'bg-pink-200'
          : passed
          ? 'bg-blue-200'
          : 'bg-yellow-200'
      }`}
    >
      <Checkbox passed={passed} habit={habit} />
      <p
        className={`capitalize text-base tracking-wide w-full ${
          habit.completed && 'line-through'
        }`}
      >
        {shortenText(habit.habitName, 50)}
      </p>
      {!passed && (
        <DeleteHabitButton
          completed={completed}
          dayNumber={dayNumber}
          habit={habit}
        />
      )}
    </div>
  );
};

export default observer(HabitEntry);
