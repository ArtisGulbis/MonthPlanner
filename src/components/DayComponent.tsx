import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Day } from '../models/day';
import { Habit } from '../models/habit';
import { useStore } from '../stores/store';
import HabitComponent from './HabitComponent';

interface Props {
  day: Day;
  habits: Habit[];
}

const DayComponent = ({ day, habits }: Props) => {
  const { habitStore, statisticsStore } = useStore();
  const { addHabit } = habitStore;

  return (
    <div className="bg-red-300 m-4 p-2 w-58 h-auto min-height flex flex-col justify-between flex-grow rounded-md shadow-md">
      <h1 className="bg-blue-300 text-center pt-2 pb-2 text-2xl">
        {day.dayNumber}
      </h1>
      <div className="flex flex-row flex-wrap mb-auto">
        {habits.map((el) => (
          <HabitComponent key={el.id} habit={el} />
        ))}
      </div>
      <Formik
        initialValues={{ habitName: '', error: '' }}
        onSubmit={(values, { resetForm }) => {
          const habit: Habit = {
            completed: false,
            dayId: day.id,
            habitName: values.habitName,
            id: uuidv4(),
          };
          addHabit(day.id, habit);
          statisticsStore.addToStats(habit);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="h-8 text-center self-center w-full flex mt-2">
            <Field
              name="habitName"
              className="w-10/12 h-full flex-grow rounded-l-md text-center text-xl font-light focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
            <button
              datatype="create"
              type="submit"
              className="min-width setl-center bg-blue-400 w-auto flex-grow-0 rounded-r-md font-light"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(DayComponent);
