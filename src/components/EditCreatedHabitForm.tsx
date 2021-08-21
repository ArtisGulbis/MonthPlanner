import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import habitService from '../services/habitService/habitService';
import { useStore } from '../stores/store';
import { buttonStyles, inputOutline } from '../utils/utils';
import Checkmark from './Checkmark';
import DeleteButton from './DeleteButton';
import * as Yup from 'yup';

interface Props {
  habit: string;
  changeEditMode: () => void;
}

const EditCreatedHabitForm = ({ habit, changeEditMode }: Props) => {
  const { userStore, statisticsStore, createdHabitsStore, dayStore } =
    useStore();

  return (
    <Formik
      initialValues={{ newName: habit, error: '' }}
      validationSchema={Yup.object({
        newName: Yup.string()
          .max(30, 'Can be max 30 characters long.')
          .required('Please enter a Habit/Task'),
      })}
      onSubmit={async (values, { setErrors }) => {
        const { newName } = values;
        if (createdHabitsStore.checkExistance(newName)) {
          setErrors({ error: 'Name already Exists' });
          return;
        }
        if (userStore.userData?.id) {
          await habitService.updateHabitName({
            habitName: habit,
            newText: newName,
            userId: userStore.userData.id,
          });
        }
        createdHabitsStore.renameHabit(habit, newName);
        dayStore.renameHabit(habit, newName);
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
          <div className="absolute error-msg text-red-700">
            <ErrorMessage name="error" />
            <ErrorMessage name="newName" />
          </div>
          {/* <p >{errors.error}</p> */}
          <div className="absolute edit-mode flex flex-row">
            <div className="flex flex-row justify-center items-center ">
              <Checkmark
                styling={`h-6 w-6 mr-2 cursor-pointer  bg-green-300 hover:bg-green-600 transform duration-75 hover:scale-105 rounded-md ${buttonStyles(
                  'green'
                )}`}
                onClick={() => handleSubmit()}
              />
              <DeleteButton
                styling={`w-6 h-6 cursor-pointer bg-red-300 hover:bg-red-600 transform duration-75 hover:scale-105 rounded-md ${buttonStyles(
                  'red'
                )} `}
                onClick={changeEditMode}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default observer(EditCreatedHabitForm);
