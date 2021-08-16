import { Field, Form, Formik } from 'formik';
import React from 'react';
import userService from '../services/userService';
import { useStore } from '../stores/store';
import { apolloClient } from '../utils/graphql';

const LoginPage = () => {
  const { userStore } = useStore();

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          const { username, password } = values;
          userStore.login(username, password);
        }}
      >
        <Form>
          <Field name="username" placeholder="Username" />
          <Field name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
      <button
        onClick={() => {
          userService.getMonth('754355a4-44d6-42ac-9354-49d6eaab8c51');
        }}
      >
        get month data
      </button>
      <button
        style={{ marginLeft: '40px' }}
        onClick={() => {
          userStore.logout();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default LoginPage;
