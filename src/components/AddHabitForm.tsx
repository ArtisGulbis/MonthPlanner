import { Formik, Form, Field } from 'formik';
import React from 'react';
import { useStore } from '../stores/store';
import AddHabitButton from './AddHabitButton';
import * as Yup from 'yup';
import { inputOutline } from '../utils/utils';
import Info from './Info';

const AddHabitForm = () => {
  const { createdHabitsStore } = useStore();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ habitName: '', error: '' }}
      onSubmit={(values, { resetForm }) => {
        createdHabitsStore.addHabit(values.habitName);
        resetForm();
      }}
      validationSchema={Yup.object({
        habitName: Yup.string().required('Please enter a Habit/Task'),
      })}
    >
      {({ handleSubmit }) => (
        <Form className="h-14 ml-4 mr-4 text-center flex flex-row mt-4 justify-start items-center relative ">
          <Field
            name="habitName"
            className={`${inputOutline()} w-1/2 z-30 text-center text-l h-10 font-light rounded-md
                `}
            placeholder="Enter Habit/Task..."
          />
          <AddHabitButton
            handleSubmit={handleSubmit}
            styling={`w-10 h-10 ml-2`}
          />
          <div className="ml-auto flex flex-col h-20 w-20 items-center justify-center">
            <Info
              tutName="add habit"
              content="Enter habit or Task, then drag and drop it onto a day either below or above."
              styling={`w-9 h-9`}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddHabitForm;
