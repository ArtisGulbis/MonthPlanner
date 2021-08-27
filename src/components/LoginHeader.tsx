import React from 'react';
import { useStore } from '../stores/store';

const LoginHeader = () => {
  const { userStore } = useStore();
  return (
    <div>
      {/* <p>Welcome {userStore.userData?.username}</p> */}
      <button onClick={() => userStore.logout()}>log out</button>
    </div>
  );
};

export default LoginHeader;
