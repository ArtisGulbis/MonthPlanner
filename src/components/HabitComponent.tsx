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
    <div className="bg-blue-300 flex m-4">
      <input
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
      <h4 className="mr-4">{habit.habitName}</h4>
      <button
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
