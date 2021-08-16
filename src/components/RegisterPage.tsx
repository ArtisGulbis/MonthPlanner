import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useStore } from '../stores/store';

const RegisterPage = () => {
  const { userStore } = useStore();
  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          const { username, password } = values;
          userStore.register(username, password);
        }}
      >
        <Form>
          <Field name="username" placeholder="Username" />
          <Field name="password" type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
