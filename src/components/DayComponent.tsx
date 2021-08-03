import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Day } from '../models/day';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import { checkAllCompletedHabits, checkCompletion } from '../utils/utils';
import AddHabitButtonComponent from './AddHabitButtonComponent';
import HabitComponent from './HabitComponent';

interface Props {
  day: Day;
  habits: Habit[];
}

const DayComponent = ({ day, habits }: Props) => {
  const { habitStore, statisticsStore, monthStore, createdHabits } = useStore();
  const { addHabit } = habitStore;
  const { addToStats } = statisticsStore;
  const { currentDay } = monthStore;

  const inputOutline = (color: string) => {
    return `text-${color}-900 placeholder-${color}-900 focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:border-transparent`;
  };

  const dayCardMonthStyle = (color: string) => {
    return `border-r-2 border-${color}-400`;
  };

  return (
    <div
      className={`m-4 p-4  min-height card-container justify-between rounded-md shadow-lg ${checkCompletion(
        day,
        monthStore.currentDay,
        false
      )}`}
      id={`${day.dayNumber}`}
    >
      <div
        className={`${
          checkAllCompletedHabits(day)
            ? dayCardMonthStyle('green')
            : day.dayNumber === currentDay
            ? dayCardMonthStyle('pink')
            : day.passed
            ? dayCardMonthStyle('blue')
            : dayCardMonthStyle('yellow')
        } flex w-full flex-col items-center justify-center h-full pr-4`}
      >
        <h1 className="pt-2 pb-2 text-4xl filter drop-shadow">{day.weekDay}</h1>
        <h1 className="pt-2 pb-2 text-5xl ">{day.dayNumber}</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap mb-auto">
          {habits.map((el) => (
            <HabitComponent
              completed={checkAllCompletedHabits(day)}
              key={el.id}
              habit={el}
              passed={day.passed}
              dayNumber={day.dayNumber}
            />
          ))}
        </div>
        {!day.passed && (
          <Formik
            enableReinitialize={true}
            initialValues={{ habitName: '', error: '' }}
            onSubmit={(values, { resetForm, setErrors }) => {
              const habit: Habit = {
                completed: false,
                dayId: day.id,
                habitName: values.habitName,
                id: uuidv4(),
              };
              createdHabits.addHabit(habit.habitName);
              addHabit(day.id, habit);
              addToStats(habit);
              resetForm();
            }}
            validationSchema={Yup.object({
              habitName: Yup.string().required(),
            })}
          >
            {({ handleSubmit }) => (
              <Form className="h-10 text-center self-center w-full flex mt-2">
                <Field
                  name="habitName"
                  className={`h-full flex-grow overflow-visible z-30 ${
                    day.passed && 'rounded-md'
                  } w-1/2 text-center text-l font-light  ml-2 rounded-l-md
                  ${
                    checkAllCompletedHabits(day)
                      ? inputOutline('green')
                      : currentDay === day.dayNumber
                      ? inputOutline('pink')
                      : day.passed
                      ? inputOutline('blue')
                      : inputOutline('yellow')
                  }
                
                `}
                  disabled={day.passed}
                  placeholder="Enter Habit/Task..."
                />
                <AddHabitButtonComponent
                  day={day}
                  handleSubmit={handleSubmit}
                />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default observer(DayComponent);
