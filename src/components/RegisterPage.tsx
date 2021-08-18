import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useStore } from '../stores/store';
import { history } from '..';
import { observer } from 'mobx-react-lite';

const RegisterPage = () => {
  const { userStore } = useStore();

  useEffect(() => {
    if (userStore.token) {
      history.push('/planner');
    }
  }, [userStore]);

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

export default observer(RegisterPage);
