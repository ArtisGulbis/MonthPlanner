import { Formik, Form, Field } from 'formik';
import React from 'react';
import { useStore } from '../stores/store';
import AddHabitButton from './AddHabitButton';
import * as Yup from 'yup';
import { Popup } from 'semantic-ui-react';

const AddHabitForm = () => {
  const { createdHabitsStore } = useStore();

  const inputOutline = () => {
    return `text-blue-600 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`;
  };

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
        <Form className="h-10 mr-auto ml-4 text-center flex mt-4 relative">
          {/* <div className="absolute bottom-12 left-2 text-red-700">
            <ErrorMessage name="habitName" />
          </div> */}
          <Field
            name="habitName"
            className={`${inputOutline()} h-full w-1/2 overflow-visible z-30 text-center text-l font-light rounded-md
                `}
            placeholder="Enter Habit/Task..."
          />
          <AddHabitButton handleSubmit={handleSubmit} />
          <Popup
            content="Enter habit or Task, then drag and drop it onto a day either below or above."
            on="click"
            pinned
            trigger={
              <button
                type="button"
                className="ml-auto mr-4 pr-6 pl-6 rounded-md text-green-900 bg-green-300 text-green-800 hover:bg-green-600 hover:text-green-200 text-lg transform duration-75 hover:scale-105
              "
              >
                Help
              </button>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddHabitForm;
