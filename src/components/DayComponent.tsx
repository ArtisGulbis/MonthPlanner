import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Day } from '../models/day';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
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

  const checkAllCompletedHabits = () => {
    return day.habits.length && day.habits.every((el) => el.completed);
  };

  const checkCompletion = () => {
    const passedDay = 'bg-blue-300 text-blue-900';
    const completedDay = 'bg-green-300 text-green-900';
    const todoDay = 'bg-yellow-300 text-yellow-900';
    const currentD = 'bg-pink-300 text-pink-900';

    if (day.passed) {
      return passedDay;
    }
    if (currentDay === day.dayNumber) {
      if (checkAllCompletedHabits()) {
        return completedDay;
      }
      return currentD;
    } else if (checkAllCompletedHabits()) {
      return completedDay;
    }
    return todoDay;
  };

  return (
    <div
      className={`bg-red-300 m-4 p-4  min-height card-container justify-between rounded-md shadow-md ${checkCompletion()}`}
    >
      <div
        className={`${
          checkAllCompletedHabits()
            ? 'border-r-2 border-green-400'
            : day.dayNumber === currentDay
            ? 'border-r-2 border-pink-400'
            : day.passed
            ? 'border-r-2 border-blue-400'
            : 'border-r-2 border-yellow-400'
        } flex w-full flex-col items-center justify-center h-full pr-4`}
      >
        <h1 className="pt-2 pb-2 text-2xl ">{day.weekDay}</h1>
        <h1 className="pt-2 pb-2 text-5xl ">{day.dayNumber}</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap mb-auto">
          {habits.map((el) => (
            <HabitComponent
              completed={checkAllCompletedHabits()}
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
            initialValues={{ habitName: '', error: '', habit: '' }}
            onSubmit={(values, { resetForm, setErrors }) => {
              const habit: Habit = {
                completed: false,
                dayId: day.id,
                habitName: values.habitName || values.habit,
                id: uuidv4(),
              };
              createdHabits.addHabit(habit.habitName || values.habit);
              addHabit(day.id, habit);
              addToStats(habit);
              resetForm();
            }}
            validationSchema={Yup.object({
              habitName: Yup.string().required(),
            })}
          >
            {({ handleSubmit }) => (
              <Form className="h-8 text-center self-center w-full flex mt-2">
                <Field
                  name="habitName"
                  className={`h-full flex-grow overflow-visible z-30 ${
                    day.passed && 'rounded-md'
                  } w-1/2 text-center text-l font-light  ml-2 rounded-l-md
                  ${
                    checkAllCompletedHabits()
                      ? 'text-green-900 placeholder-pink-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                      : currentDay === day.dayNumber
                      ? 'text-pink-900 placeholder-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent'
                      : day.passed
                      ? 'text-blue-900 placeholder-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                      : 'text-yellow-900 placeholder-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent'
                  }
                
                `}
                  disabled={day.passed}
                  placeholder="Enter habit/task..."
                />
                <button
                  onClick={() => handleSubmit}
                  datatype="create"
                  disabled={day.passed}
                  type="submit"
                  className={`min-width flex-grow-0 ml-auto rounded-r-md z-0 font-light w-1/4 min-w-min tracking-widest h-full 
                  ${
                    checkAllCompletedHabits()
                      ? 'bg-green-400 hover:bg-green-500'
                      : currentDay === day.dayNumber
                      ? 'bg-pink-400 hover:bg-pink-500'
                      : day.passed
                      ? 'bg-blue-400 hover:bg-blue-500'
                      : 'bg-yellow-400 hover:bg-yellow-500'
                  }
                  `}
                >
                  Create
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default observer(DayComponent);
