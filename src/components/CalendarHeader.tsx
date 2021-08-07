import React from 'react';
import { Day } from '../models/day';
import CalendarHeaderDayCard from './CalendarHeaderDayCard';

interface Props {
  days: Day[];
}

const CalendarHeader = ({ days }: Props) => {
  return (
    <div
      className={
        'text-center my-20 flex flex-wrap justify-center items-center w-10/12 m-auto'
      }
    >
      {days.map((day) => (
        <CalendarHeaderDayCard day={day} />
      ))}
    </div>
  );
};

export default CalendarHeader;
