import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { history } from '..';
import { useStore } from '../stores/store';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const StartPage = () => {
  const { modalStore, userStore } = useStore();

  useEffect(() => {
    if (userStore.token) {
      history.push('/planner');
    }
  }, [userStore]);
  return (
    <div className="w-full h-screen  flex items-center flex-col justify-center">
      <h1 className="text-6xl text-blue-800">Welcome to ....</h1>
      <div className="flex flex-col justify-center items-center p-4 w-2/3 h-1/3 mb-64">
        <button
          onClick={() => modalStore.openModal(<LoginPage />)}
          className="bg-blue-300 text-blue-800 text-3xl pl-6 pr-6 rounded-md mt-4 shadow-md hover:bg-blue-600 hover:text-blue-200 transform duration-100 hover:scale-110 w-52 h-20"
        >
          Login!
        </button>
        <button
          onClick={() => modalStore.openModal(<RegisterPage />)}
          className="bg-blue-600 text-blue-200 text-3xl pl-6 pr-6 rounded-md mt-4 mb-8 shadow-md hover:bg-blue-300 hover:text-blue-800 transform duration-100 hover:scale-110 w-52 h-20"
        >
          Register!
        </button>
        <Link
          to="/demo"
          className="bg-indigo-600 text-indigo-200 text-2xl pl-6 pr-6 rounded-md mt-4 shadow-md hover:bg-indigo-300 hover:text-indigo-800 transform duration-100 hover:scale-110 w-22 h-16"
        >
          Try Demo!
        </Link>
      </div>
    </div>
  );
};

export default observer(StartPage);
