import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';
import CustomForm from './CustomForm';

const LoginPage = () => {
  const { userStore } = useStore();

  return (
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
      {({ errors }) => <CustomForm name="Log in" errors={errors.errors} />}
    </Formik>
  );
};

export default observer(LoginPage);
