import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';
import CustomForm from './CustomForm';

const RegisterPage = () => {
  const { userStore } = useStore();

  // const usernameRegex = /^[a-zA-Z0-9_]{4,30}$/gi;

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '', error: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          try {
            await userStore.register(username, password);
          } catch (error) {
            setErrors({ error: error });
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
