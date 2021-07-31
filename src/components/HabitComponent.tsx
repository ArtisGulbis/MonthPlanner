import { observer } from 'mobx-react-lite';
import React from 'react';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';

interface Props {
  habit: Habit;
}

const HabitComponent = ({ habit }: Props) => {
  const {
    habitStore: { removeHabit, completeHabit },
    statisticsStore: {
      reduceHabitCount,
      reduceCompletedCount,
      increaseCompletedCount,
    },
  } = useStore();
  return (
    <div className="w-full flex mt-2 bg-green-100 items-center rounded-r-md rounded-l-md">
      <input
        className="mr-2 ml-2"
        type="checkbox"
        checked={habit.completed}
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
        className={`capitalize text-sm font-light w-full ${
          habit.completed && 'line-through'
        }`}
      >
        {habit.habitName}
      </p>
      <button
        className="ml-auto text-sm bg-red-400 p-1 pl-2 pr-2 rounded-r-md hover:bg-red-200"
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
