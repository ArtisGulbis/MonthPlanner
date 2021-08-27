import React from 'react';
import { ErrorMessage, Field, Form } from 'formik';

interface Props {
  errors: string | undefined;
  name: string;
  errorMessages?: string[];
}

const CustomForm = ({ errors, name, errorMessages }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col font-sans w-full min-h-full p-6">
      <h1 className="mb-10 text-5xl tracking-wide font-sans text-indigo-800">
        {name}
      </h1>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-800 to-transparent -mt-5 mb-8"></div>
      <Form className=" flex items-center flex-col justify-center">
        <div className="flex flex-col">
          <label className="pb-2 text-indigo-100">Username</label>
          <Field
            name="username"
            placeholder="Username"
            className="mb-4 rounded-md p-2 text-center focus:ring-4 focus:ring-indigo-200 focus:outline-none focus:border-transparent placeholder-indigo-800 text-indigo-700"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="pb-2 text-indigo-100">Password</label>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="mb-4 rounded-md p-2 text-center focus:ring-4 focus:ring-indigo-300 focus:outline-none focus:border-transparent placeholder-indigo-800 text-indigo-700"
          />
        </div>
        {errors && (
          <div className="flex flex-col">
            <p className="text-red-800 bg-red-200 p-1 pl-6 pr-6 mt-4 mb-4 rounded-md shadow-inner">
              {errorMessages?.map((el) => (
                <ErrorMessage name={el} key={el} />
              ))}
            </p>
          </div>
        )}

        {/* {errorMessages && (
          <p className="text-red-800 bg-red-200 p-1 pl-6 pr-6 mt-4 mb-4 rounded-md shadow-inner">
          </p>
        )} */}
        {/* {errors && <p className="">{errors.errors}</p>} */}
        <button
          type="submit"
          className="bg-indigo-300 text-indigo-800 p-2 pl-6 pr-6 rounded-md mt-4 shadow-md hover:bg-indigo-600 hover:text-indigo-200 transform duration-100 hover:scale-110"
        >
          {name}
        </button>
      </Form>
    </div>
  );
};

export default CustomForm;
