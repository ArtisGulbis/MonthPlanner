import { makeAutoObservable } from 'mobx';
import { User } from '../generated/graphql';
import userService from '../services/userService';
import axios from 'axios';

export default class UserStore {
  user: User | undefined = undefined;
  token: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  register = async (username: string, password: string) => {
    const user = await userService.register(username, password);
    if (user) {
      this.user = user;
    }
  };

  login = async (username: string, password: string) => {
    const res = await axios.post('http://localhost:5000/auth/login', {
      username,
      password,
    });
    if (res.data) {
      this.token = res.data.access_token;
      window.localStorage.setItem('token', JSON.stringify(this.token));
    }
  };

  logout = async () => {
    window.localStorage.removeItem('token');
  };
}
