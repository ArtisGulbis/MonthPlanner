import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { history } from '..';
import { useStore } from '../stores/store';

const LoginPage = () => {
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
          userStore.login(username, password);
        }}
      >
        <Form>
          <Field name="username" placeholder="Username" />
          <Field name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default observer(LoginPage);
