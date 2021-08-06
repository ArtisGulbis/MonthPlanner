import { observer } from 'mobx-react-lite';
import React from 'react';
import { Day } from '../models/day';
import { useStore } from '../stores/store';
import { checkCompletion } from '../utils/utils';

interface Props {
  days: Day[];
}

const CalendarHeaderComponent = ({ days }: Props) => {
  const { monthStore } = useStore();

  const borderAroundCurrentDay = (day: Day) => {
    if (
      day.dayNumber === monthStore.currentDay &&
      day.habits.length &&
      day.habits.every((el) => el.completed)
    ) {
      return 'border-green-500 border-2 font-normal';
    } else if (day.dayNumber === monthStore.currentDay) {
      return 'border-pink-500 border-2 font-normal';
    }
  };

  return (
    <div
      className={'text-center my-20 flex flex-wrap justify-center items-center'}
    >
      {days.map((day) => (
        <a
          key={day.id}
          className={`w-min-min w-12 p-2 m-2 text-xl transform duration-100 hover:scale-110 hover:-translate-y-0.5 rounded-md shadow-md ${checkCompletion(
            day,
            monthStore.currentDay,
            true
          )} ${borderAroundCurrentDay(day)}`}
          href={`#${day.dayNumber}`}
        >
          <div
            className={`${
              day.habits.length &&
              `w-4 h-4 ${
                day.habits.every((el) => el.completed)
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } absolute indicator rounded-full`
            }`}
          ></div>
          {day.dayNumber}
        </a>
      ))}
    </div>
  );
};

export default observer(CalendarHeaderComponent);
