import { observer } from 'mobx-react-lite';
import React from 'react';
import { useDrop } from 'react-dnd';
import { Popup } from 'semantic-ui-react';
import { Day } from '../generated/graphql';
import habitService from '../services/habitService/habitService';
import { useStore } from '../stores/store';
import { checkAllCompletedHabits, checkCompletion } from '../utils/utils';
import HabitEntry from './HabitEntry';

interface Props {
  day: Day;
}

const CalendarHeaderDayCard = ({ day }: Props) => {
  const {
    monthStore,
    dayStore: { addHabit },
  } = useStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'habit',
    drop: async (item: { name: string }) => {
      const res = await habitService.addHabit({
        dayId: day.id,
        habitName: item.name,
      });

      if (res?.addHabit) {
        addHabit(day.id, res.addHabit);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const borderAroundCurrentDay = (day: Day) => {
    if (day.habits) {
      if (
        day.dayNumber === monthStore.currentDay &&
        day.habits.length &&
        day.habits.every((el) => el.completed)
      ) {
        return 'border-green-500 border-2 font-normal';
      } else if (day.dayNumber === monthStore.currentDay) {
        return 'border-pink-500 border-2 font-normal';
      }
    }
  };

  const trigger = () => {
    return (
      <div
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
        onDoubleClick={() => (window.location.href = `#${day.dayNumber}`)}
      >
        <div
          className={`${
            day.habits &&
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
        <p className="text-sm">{day.weekday}</p>
        {day.dayNumber}
      </div>
    );
  };

  return (
    <>
      {day.habits && day.habits.length > 0 ? (
        <Popup
          hoverable
          on="click"
          basic
          style={{
            backgroundColor: `${
              checkAllCompletedHabits(day)
                ? 'rgba(110, 231, 183,1)'
                : monthStore.currentDay === day.dayNumber
                ? 'rgba(249, 168, 212,1)'
                : day.passed
                ? 'rgba(147, 197, 253,1)'
                : day.weekday === 'Sat' || day.weekday === 'Sun'
                ? 'rgba(252, 165, 165,1)'
                : 'rgba(252, 211, 77,1)'
            }`,
            paddingRight: '1.5rem',
          }}
          content={day.habits.map((habit) => (
            <ul
              key={habit.id}
              className={`${
                day.habits &&
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
                    : day.weekday === 'Sat' || day.weekday === 'Sun'
                    ? 'bg-red-200'
                    : 'bg-yellow-200'
                }`}
                completed={checkAllCompletedHabits(day)}
                dayNumber={day.dayNumber}
                habit={habit}
                dayId={day.id}
                passed={day.passed}
                weekday={day.weekday}
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
