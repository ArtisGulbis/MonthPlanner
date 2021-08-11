import { observer } from 'mobx-react-lite';
import React from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Day } from '../models/day';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import { checkAllCompletedHabits, checkCompletion } from '../utils/utils';
import HabitEntry from './HabitEntry';

interface Props {
  day: Day;
  habits: Habit[];
}

const DayCard = ({ day, habits }: Props) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'habit',
    drop: (item: { name: string }) => {
      const habit: Habit = {
        completed: false,
        dayId: day.id,
        habitName: item.name,
        id: uuidv4(),
        missed: false,
      };
      createdHabitsStore.addHabit(habit.habitName);
      addHabit(day.id, habit);
      addToStats(habit);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const { dayStore, statisticsStore, monthStore, createdHabitsStore } =
    useStore();
  const { addHabit } = dayStore;
  const { addToStats } = statisticsStore;
  const { currentDay } = monthStore;
  const dayCardMonthStyle = (color: string) => {
    return `border-r-2 border-${color}-400`;
  };

  const backgroundStyles = () => {
    if (checkAllCompletedHabits(day)) {
      return dayCardMonthStyle('green');
    } else if (day.dayNumber === currentDay) {
      return dayCardMonthStyle('pink');
    } else if (day.passed && checkAllCompletedHabits(day)) {
      return dayCardMonthStyle('green');
    } else if (day.passed) {
      return dayCardMonthStyle('blue');
    } else if (day.weekDay === 'Sun' || day.weekDay === 'Sat') {
      return dayCardMonthStyle('red');
    }
    return dayCardMonthStyle('yellow');
  };

  const cardNumberStyles =
    'p-2  md:text-4xl text-3xl filter drop-shadow font-sans';

  return (
    <div
      ref={!day.passed ? drop : undefined}
      className={`${
        isOver && 'filter brightness-110'
      } md:m-4 md:p-4 p-4 m-2  min-height card-container justify-between rounded-md shadow-lg ${checkCompletion(
        day,
        monthStore.currentDay,
        false
      )}`}
      id={`${day.dayNumber}`}
    >
      <div
        className={`${backgroundStyles()} flex w-full day-card-header flex-col items-center justify-center h-full pr-4 `}
      >
        <h1 className={cardNumberStyles}>{day.weekDay}</h1>
        <h1 className={cardNumberStyles}>{day.dayNumber}</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap mb-auto">
          {habits.map((el) => (
            <HabitEntry
              styling={`w-full flex items-center shadow-inner rounded-r-md rounded-l-md habit h-10 ml-2 ${
                checkAllCompletedHabits(day)
                  ? 'bg-green-200'
                  : currentDay === day.dayNumber
                  ? 'bg-pink-200'
                  : day.passed
                  ? 'bg-blue-200'
                  : day.weekDay === 'Sat' || day.weekDay === 'Sun'
                  ? 'bg-red-200'
                  : 'bg-yellow-200'
              }`}
              completed={checkAllCompletedHabits(day)}
              key={el.id}
              habit={el}
              passed={day.passed}
              dayNumber={day.dayNumber}
              weekday={day.weekDay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(DayCard);
