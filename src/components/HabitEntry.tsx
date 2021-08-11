import { observer } from 'mobx-react-lite';
import React from 'react';
import { Habit } from '../models/habit';
import { shortenText } from '../utils/utils';
import Checkbox from './Checkbox';
import DeleteHabitButton from './DeleteHabitButton';

interface Props {
  habit: Habit;
  passed: boolean;
  completed: boolean | 0;
  dayNumber: number;
  weekday: string;
  styling?: string;
}

const HabitEntry = ({
  habit,
  passed,
  completed,
  dayNumber,
  styling,
}: Props) => {
  return (
    <div className={styling}>
      <Checkbox passed={passed} habit={habit} />
      <p
        className={`capitalize text-base tracking-wide w-full ${
          habit.completed && 'line-through'
        }`}
      >
        {shortenText(habit.habitName, 15)}
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
