import { observer } from 'mobx-react-lite';
import React from 'react';
import { useDrop } from 'react-dnd';
import { Day, Habit } from '../generated/graphql';
import habitService from '../services/habitService/habitService';
import { useStore } from '../stores/store';
import { checkAllCompletedHabits, checkCompletion } from '../utils/utils';
import HabitEntry from './HabitEntry';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  day: Day;
  habits: Habit[] | undefined | null;
}

const DayCard = ({ day, habits }: Props) => {
  const { userStore, statisticsStore } = useStore();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'habit',
    drop: async (item: { name: string }) => {
      if (!dayStore.demo) {
        if (userStore.userData?.id) {
          const res = await habitService.addHabit({
            dayId: day.id,
            habitName: item.name,
            userId: userStore.userData.id,
          });
          if (res?.addHabit) {
            dayStore.addHabit(day.id, res.addHabit);
            statisticsStore.addToStats(res.addHabit);
          }
        }
      } else {
        const habit: Habit = {
          completed: false,
          habitName: item.name,
          id: uuidv4(),
          missed: false,
        };
        dayStore.addHabit(day.id, habit);
        statisticsStore.addToStats(habit);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const { dayStore, monthStore } = useStore();
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
    } else if (day.weekday === 'Sun' || day.weekday === 'Sat') {
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
        <h1 className={cardNumberStyles}>{day.weekday}</h1>
        <h1 className={cardNumberStyles}>{day.dayNumber}</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap mb-auto">
          {habits?.map((el) => (
            <HabitEntry
              styling={`w-full flex items-center shadow-inner rounded-r-md rounded-l-md habit h-10 ml-2 ${
                checkAllCompletedHabits(day)
                  ? 'bg-green-200'
                  : currentDay === day.dayNumber
                  ? 'bg-pink-200'
                  : day.passed
                  ? 'bg-blue-200'
                  : day.weekday === 'Sat' || day.weekday === 'Sun'
                  ? 'bg-red-200'
                  : 'bg-yellow-200'
              }`}
              completed={checkAllCompletedHabits(day)}
              key={el.id}
              habit={el}
              dayId={day.id}
              passed={day.passed}
              dayNumber={day.dayNumber}
              weekday={day.weekday}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(DayCard);
