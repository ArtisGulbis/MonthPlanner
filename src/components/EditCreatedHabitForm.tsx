import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useStore } from '../stores/store';
import { buttonStyles, inputOutline } from '../utils/utils';
import Checkmark from './Checkmark';
import DeleteButton from './DeleteButton';

interface Props {
  habit: string;
  changeEditMode: () => void;
}

const EditCreatedHabitForm = ({ habit, changeEditMode }: Props) => {
  const { createdHabitsStore, dayStore, statisticsStore } = useStore();
  return (
    <Formik
      initialValues={{ newName: habit, error: '' }}
      onSubmit={(values, { setErrors }) => {
        const { newName } = values;
        if (habit === newName) {
          changeEditMode();
          return;
        }
        if (
          dayStore.checkExistance(newName) ||
          createdHabitsStore.checkExistance(newName) ||
          statisticsStore.checkExistance(newName)
        ) {
          console.log('heeeyy');
          setErrors({ error: 'Name already exists' });
          return;
        }
        dayStore.renameHabit(habit, newName);
        createdHabitsStore.renameHabit(habit, newName);
        statisticsStore.renameHabit(habit, newName);
      }}
    >
      {({ handleSubmit, errors }) => (
        <Form className="relative flex flex-col p-2 z-50">
          <Field
            autoFocus={true}
            name="newName"
            className={`${inputOutline()} w-36 rounded-md text-center text-lg capitalize`}
          />
          <p className="absolute error-msg text-red-700">{errors.error}</p>
          <div className="absolute edit-mode flex flex-row">
            <div className="flex flex-row justify-center items-center ">
              <Checkmark
                styling={`h-6 w-6 mr-2 cursor-pointer  bg-blue-400 text-blue-800 hover:bg-blue-200 transform duration-75 hover:scale-105 rounded-md ${buttonStyles()}`}
                onClick={() => handleSubmit()}
              />
              <DeleteButton
                styling={`w-6 h-6 cursor-pointer bg-blue-400 text-blue-800 hover:bg-blue-200 transform duration-75 hover:scale-105 rounded-md ${buttonStyles()} `}
                onClick={changeEditMode}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCreatedHabitForm;
