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
        initialValues={{ username: '', password: '', errors: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          try {
            await userStore.login(username, password);
          } catch (error) {
            setErrors({ errors: error });
          }
        }}
      >
        {({ errors }) => (
          <Form>
            <Field name="username" placeholder="Username" />
            <Field name="password" type="password" placeholder="Password" />
            {errors && <p>{errors.errors}</p>}
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(LoginPage);
