import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import * as Yup from 'yup';
import { useStore } from '../stores/store';
import CustomForm from './CustomForm';

const RegisterPage = () => {
  const { userStore } = useStore();

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
        {({ errors }) => (
          <CustomForm
            errors={errors.error}
            name="Register"
            errorMessages={['username', 'password', 'error']}
          />
          // <Form>
          //   <Field name="username" placeholder="Username" />
          //   <Field name="password" type="password" placeholder="Password" />
          //   <button type="submit">Register</button>
          //   <div>
          //   </div>
          // </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(RegisterPage);
