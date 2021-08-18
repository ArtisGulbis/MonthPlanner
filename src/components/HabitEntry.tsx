import { observer } from 'mobx-react-lite';
import React from 'react';
// import { Habit } from '../models/habit';
import { Habit } from '../generated/graphql';
import { shortenText } from '../utils/utils';
import Checkbox from './Checkbox';
import DeleteHabitButton from './DeleteHabitButton';

interface Props {
  habit: Habit;
  passed: boolean;
  completed: boolean | 0 | undefined;
  dayNumber: number;
  weekday: string;
  dayId: string;
  styling?: string;
}

const HabitEntry = ({
  habit,
  passed,
  completed,
  dayNumber,
  styling,
  dayId,
}: Props) => {
  return (
    <div className={styling}>
      <Checkbox passed={passed} habit={habit} dayId={dayId} />
      <p
        className={`capitalize text-base tracking-wide w-full ${
          habit.completed && 'line-through'
        }`}
      >
        {shortenText(habit.habitName, 15)}
      </p>
      {!passed && (
        <DeleteHabitButton
          dayId={dayId}
          completed={completed}
          dayNumber={dayNumber}
          habit={habit}
        />
      )}
    </div>
  );
};

export default observer(HabitEntry);
