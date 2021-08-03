import { observer } from 'mobx-react-lite';
import React from 'react';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import { shortenText } from '../utils/utils';

interface Props {
  habit: Habit;
  passed: boolean;
  completed: boolean | 0;
  dayNumber: number;
}

const HabitComponent = ({ habit, passed, completed, dayNumber }: Props) => {
  const {
    habitStore: { removeHabit, completeHabit },
    statisticsStore: {
      reduceHabitCount,
      reduceCompletedCount,
      increaseCompletedCount,
    },
    monthStore: { currentDay },
  } = useStore();

  return (
    <div
      className={`w-full flex items-center rounded-r-md rounded-l-md habit h-8 ml-2 ${
        completed
          ? 'bg-green-200'
          : currentDay === dayNumber
          ? 'bg-pink-200'
          : passed
          ? 'bg-blue-200'
          : 'bg-yellow-200'
      }`}
    >
      <label className="checkbox">
        <span className="checkbox__input">
          <input
            type="checkbox"
            name="checkbox"
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
          <span className="checkbox__control">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
              />
            </svg>
          </span>
        </span>
      </label>
      <p
        className={`capitalize text-xl tracking-wide font-light w-full ${
          habit.completed && 'line-through'
        }`}
      >
        {shortenText(habit.habitName, 30)}
      </p>
      {!passed && (
        <button
          disabled={passed}
          className={`ml-auto text-l tracking-widest pl-2 pr-2 h-full w-1/4 rounded-r-md min-w-min ${
            completed
              ? 'bg-green-400 hover:bg-green-500'
              : currentDay === dayNumber
              ? 'bg-pink-400 hover:bg-pink-500'
              : passed
              ? 'bg-blue-400 hover:bg-blue-500'
              : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
          onClick={(e) => {
            reduceCompletedCount(habit);
            reduceHabitCount(habit);
            removeHabit(habit.dayId, habit.id);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default observer(HabitComponent);
