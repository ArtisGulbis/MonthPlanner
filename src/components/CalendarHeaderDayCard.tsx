import React from 'react';
import { useDrop } from 'react-dnd';
import { Habit } from '../models/habit';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../stores/store';
import { Day } from '../models/day';
import { checkCompletion, checkAllCompletedHabits } from '../utils/utils';
import { observer } from 'mobx-react-lite';
import { Popup } from 'semantic-ui-react';
import HabitEntry from './HabitEntry';

interface Props {
  day: Day;
}

const CalendarHeaderDayCard = ({ day }: Props) => {
  const {
    createdHabitsStore,
    monthStore,
    dayStore: { addHabit },
    statisticsStore: { addToStats },
  } = useStore();

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

  const trigger = () => {
    return (
      <a
        key={day.id}
        ref={!day.passed ? drop : undefined}
        className={`${
          isOver && 'filter brightness-110 transform scale-150'
        } w-min-min w-14 p-2 m-2 text-xl flex flex-col items-center justify-center transform duration-100 hover:scale-110 hover:-translate-y-0.5 rounded-md shadow-md ${checkCompletion(
          day,
          monthStore.currentDay,
          true,
          false
        )} ${borderAroundCurrentDay(day)}`}
        href={`#${day.dayNumber}`}
      >
        <div
          className={`${
            day.habits.length &&
            `w-4 h-4 ${
              checkAllCompletedHabits(day)
                ? 'bg-green-500'
                : day.passed && checkAllCompletedHabits(day)
                ? 'bg-green-500'
                : day.passed
                ? 'bg-blue-500'
                : 'bg-red-500'
            } absolute indicator rounded-full`
          }`}
        ></div>
        <p className="text-sm">{day.weekDay}</p>
        {day.dayNumber}
      </a>
    );
  };

  return (
    <>
      {day.habits.length > 0 ? (
        <Popup
          hoverable
          basic
          style={{
            backgroundColor: `${
              checkAllCompletedHabits(day)
                ? 'rgba(110, 231, 183,1)'
                : monthStore.currentDay === day.dayNumber
                ? 'rgba(249, 168, 212,1)'
                : day.passed
                ? 'rgba(147, 197, 253,1)'
                : day.weekDay === 'Sat' || day.weekDay === 'Sun'
                ? 'rgba(252, 165, 165,1)'
                : 'rgba(252, 211, 77,1)'
            }`,
            paddingRight: '1.5rem',
          }}
          content={day.habits.map((habit) => (
            <ul
              key={habit.id}
              className={`${
                day.habits.length &&
                `${
                  checkAllCompletedHabits(day)
                    ? 'text-green-800'
                    : day.passed && checkAllCompletedHabits(day)
                    ? 'text-green-800'
                    : monthStore.currentDay === day.dayNumber
                    ? 'text-pink-800'
                    : day.passed
                    ? 'text-blue-800'
                    : 'text-yellow-800'
                }`
              }`}
            >
              <HabitEntry
                styling={`w-full flex items-center shadow-inner rounded-r-md rounded-l-md habit h-10 m-1 ${
                  checkAllCompletedHabits(day)
                    ? 'bg-green-200'
                    : monthStore.currentDay === day.dayNumber
                    ? 'bg-pink-200'
                    : day.passed
                    ? 'bg-blue-200'
                    : day.weekDay === 'Sat' || day.weekDay === 'Sun'
                    ? 'bg-red-200'
                    : 'bg-yellow-200'
                }`}
                completed={checkAllCompletedHabits(day)}
                dayNumber={day.dayNumber}
                habit={habit}
                passed={day.passed}
                weekday={day.weekDay}
              />
            </ul>
          ))}
          trigger={trigger()}
        />
      ) : (
        trigger()
      )}
    </>
  );
};

export default observer(CalendarHeaderDayCard);
