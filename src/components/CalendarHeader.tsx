import React from 'react';
import { Day } from '../generated/graphql';
import CalendarHeaderDayCard from './CalendarHeaderDayCard';
import Info from './Info';

interface Props {
  days: Day[];
}

const CalendarHeader = ({ days }: Props) => {
  return (
    <div
      className={
        'text-center my-20 flex flex-wrap justify-center items-center w-10/12 m-auto relative'
      }
    >
      <div className="order-last relative flex flex-col items-center w-20">
        <Info
          content="Click once on a day to edit its habits/tasks. Double click on a day to jump to it."
          tutName="calendar header"
          styling={`w-8 h-8`}
        />
      </div>
      {days.map((day) => (
        <CalendarHeaderDayCard key={day.id} day={day} />
      ))}
    </div>
  );
};

export default CalendarHeader;
