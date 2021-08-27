import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import AddHabitButton from './AddHabitButton';
import * as Yup from 'yup';
import { inputOutline } from '../utils/utils';
import Info from './Info';
import { useStore } from '../stores/store';

const AddHabitForm = () => {
  const { createdHabitsStore } = useStore();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ habitName: '', error: '' }}
      onSubmit={async (values, { resetForm, setErrors }) => {
        const { habitName } = values;
        if (createdHabitsStore.checkExistance(habitName)) {
          return setErrors({ error: 'Name already exists' });
        }
        createdHabitsStore.addHabit(habitName);
        resetForm();
      }}
      validationSchema={Yup.object({
        habitName: Yup.string()
          .max(30, 'Can be max 30 characters long.')
          .required('Please enter a Habit/Task'),
      })}
    >
      {({ handleSubmit, errors }) => (
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
          <div className="text-red-800  min-w-min min-h-full flex justify-center items-center">
            <ErrorMessage name="habitName" />
            {errors.error ? <p>{errors.error}</p> : null}
          </div>
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
