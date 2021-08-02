import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Day } from '../models/day';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import { BACKGROUND_COL, completedDay, CURRENTDAY } from '../utils/styles';
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
    if (day.passed) {
      return 'bg-blue-500';
    }
    if (currentDay === day.dayNumber) {
      if (checkAllCompletedHabits()) {
        return completedDay.month;
      }
      return CURRENTDAY;
    } else {
      if (checkAllCompletedHabits()) {
        return completedDay.month;
      }
    }
    return BACKGROUND_COL;
  };

  return (
    <div
      className={`bg-red-300 m-2 p-2  min-height card-container justify-between rounded-md shadow-md  ${checkCompletion()}`}
      style={{
        backgroundColor: `${checkCompletion()}`,
      }}
    >
      <div className="flex w-full flex-col items-center justify-center h-full bg-blue-300 rounded-md">
        <h1 className="pt-2 pb-2 text-2xl ">{day.weekDay}</h1>
        <h1 className="pt-2 pb-2 text-2xl ">{day.dayNumber}</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap mb-auto">
          {habits.map((el) => (
            <HabitComponent key={el.id} habit={el} passed={day.passed} />
          ))}
        </div>
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
          // validationSchema={Yup.object({
          //   habitName: Yup.string().required(),
          // })}
        >
          {({ handleSubmit }) => (
            <Form className="h-8 text-center self-center w-full flex mt-2">
              <Field
                name="habitName"
                className="h-full flex-grow rounded-l-md text-center text-l font-light focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                disabled={day.passed}
                placeholder="Enter habit/task..."
              />
              <button
                onClick={() => handleSubmit}
                datatype="create"
                disabled={day.passed}
                type="submit"
                className="min-width flex-grow-0 ml-auto rounded-r-md font-light w-1/4 bg-green-300 hover:bg-green-400 min-w-min tracking-widest h-full"
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default observer(DayComponent);
