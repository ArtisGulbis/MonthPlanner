import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useStore } from '../stores/store';
import { history } from '..';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

const RegisterPage = () => {
  const { userStore } = useStore();

  useEffect(() => {
    if (userStore.token) {
      history.push('/planner');
    }
  }, [userStore]);

  const usernameRegex = /^[a-zA-Z0-9_]{4,30}$/gi;

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '', error: '' }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, 'Must be at least 8 characters long!')
            .max(20, 'Max 20 characters!')
            .required('Password is required!'),
          username: Yup.string()
            .min(4, 'Must be at least 4 characters long!')
            .max(30, 'Max 30 characters long!')
            .trim()
            .lowercase()
            .matches(
              usernameRegex,
              'Cannot have whitespaces or special characters'
            )
            .required('Username is required!'),
        })}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          try {
            await userStore.register(username, password);
          } catch (error) {
            setErrors({ error: error.message });
          }
        }}
      >
        {() => (
          <Form>
            <Field name="username" placeholder="Username" />
            <Field name="password" type="password" placeholder="Password" />
            <button type="submit">Register</button>
            <div>
              <ErrorMessage name="username" />
              <ErrorMessage name="password" />
              <ErrorMessage name="error" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(RegisterPage);
