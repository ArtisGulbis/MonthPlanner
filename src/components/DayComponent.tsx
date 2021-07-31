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
    <div className="">
      <h3>{day.dayNumber}</h3>
      {habits.map((el) => (
        <HabitComponent key={el.id} habit={el} />
      ))}
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
          <Form>
            <Field name="habitName" className="w-1/2" />
            <button datatype="create" type="submit" disabled={isSubmitting}>
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(DayComponent);
