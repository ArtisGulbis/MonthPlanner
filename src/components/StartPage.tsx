import React from 'react';
import { history } from '..';

const StartPage = () => {
  return (
    <div>
      <button onClick={() => history.push('/login')}>Login</button>
      <button
        onClick={() => history.push('/register')}
        style={{ marginLeft: '30px' }}
      >
        Register
      </button>
    </div>
  );
};

export default StartPage;
