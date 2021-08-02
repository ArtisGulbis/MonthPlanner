import { observer } from 'mobx-react-lite';
import React from 'react';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import { shortenText } from '../utils/utils';

interface Props {
  habit: Habit;
  passed: boolean;
}

const HabitComponent = ({ habit, passed }: Props) => {
  const {
    habitStore: { removeHabit, completeHabit },
    statisticsStore: {
      reduceHabitCount,
      reduceCompletedCount,
      increaseCompletedCount,
    },
  } = useStore();
  return (
    <div className="w-full flex bg-green-100 items-center rounded-r-md rounded-l-md habit h-8">
      <input
        className="mr-2 ml-2 h-12 w-6 h-6"
        type="checkbox"
        checked={habit.completed}
        disabled={passed}
        onChange={(e) => {
          if (e.target.checked) {
            increaseCompletedCount(habit);
            completeHabit(habit.dayId, habit.id, true);
          } else {
            reduceCompletedCount(habit);
            completeHabit(habit.dayId, habit.id, false);
          }
        }}
      />
      <p
        className={`capitalize text-xl tracking-wide font-light w-full ${
          habit.completed && 'line-through'
        }`}
      >
        {shortenText(habit.habitName)}
      </p>
      <button
        disabled={passed}
        className="ml-auto text-l tracking-widest bg-red-400 pl-2 pr-2 h-full w-1/4 rounded-r-md hover:bg-red-200 min-w-min"
        onClick={(e) => {
          reduceCompletedCount(habit);
          reduceHabitCount(habit);
          removeHabit(habit.dayId, habit.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default observer(HabitComponent);
