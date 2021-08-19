import React from 'react';
import { Habit } from '../generated/graphql';
import habitService from '../services/habitService/habitService';
import { useStore } from '../stores/store';

interface Props {
  habit: Habit;
  passed: boolean;
  dayId: string;
}

const Checkbox = ({ habit, passed, dayId }: Props) => {
  const { dayStore, statisticsStore } = useStore();

  const updateHabit = async (state: boolean) => {
    await habitService.updateHabitCompletion(state, habit.id);
    dayStore.completeHabit(dayId, habit.id, state);
  };

  return (
    <label className="checkbox ml-2">
      <span className="checkbox__input">
        <input
          type="checkbox"
          name="checkbox"
          checked={habit.completed}
          disabled={passed}
          onChange={async (e) => {
            updateHabit(e.target.checked ? true : false);
            e.target.checked
              ? statisticsStore.increaseCompletedCount(habit)
              : statisticsStore.reduceCompletedCount(habit);
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
  );
};

export default Checkbox;
