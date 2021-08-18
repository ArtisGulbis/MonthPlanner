import { makeAutoObservable, reaction, runInAction } from 'mobx';
import userService from '../services/userService/userService';
import axios from 'axios';
import { history } from '..';
import { UserData } from '../models/userData';
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
  USERDATA,
} from '../utils/utils';

export const MONTHID = 'monthId';
export const TOKEN = 'token';
export default class UserStore {
  userData: UserData | null = getFromStorage<UserData>(USERDATA);
  // monthId: string | null = window.localStorage.getItem(MONTHID);
  // username: string | null = window.localStorage.getItem('username');
  token: string | null = window.localStorage.getItem(TOKEN);

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem(TOKEN, token);
        } else {
          window.localStorage.removeItem(TOKEN);
        }
      }
    );
    // reaction(
    //   () => this.monthId,
    //   (monthId) => {
    //     if (monthId) {
    //       window.localStorage.setItem(MONTHID, monthId);
    //     } else {
    //       window.localStorage.removeItem(MONTHID);
    //     }
    //   }
    // );
    // reaction(
    //   () => this.username,
    //   (username) => {
    //     if (username) {
    //       window.localStorage.setItem('username', username);
    //     } else {
    //       window.localStorage.removeItem('username');
    //     }
    //   }
    // );
  }

  setToken = (token: string | null) => {
    this.token = token;
  };

  setUserData = (userData: UserData) => {
    this.userData = userData;
  };

  // setUsername = (username: string | null) => {
  //   this.username = username;
  // };

  // setMonthId = (monthId: string | null) => {
  //   this.monthId = monthId;
  // };

  register = async (username: string, password: string) => {
    const user = await userService.register(username, password);
    if (user) {
      this.userData!.monthId = user.month.id;
    }
  };

  get isLoggedIn() {
    return !!this.token;
  }

  login = async (username: string, password: string) => {
    const res = await axios.post('http://localhost:5000/auth/login', {
      username,
      password,
    });
    if (res.data) {
      console.log(res.data);
      runInAction(() => {
        this.setToken(res.data.access_token);
        this.setUserData({
          id: res.data.id,
          monthId: res.data.monthId,
          username: res.data.username,
        });
        // this.setMonthId(res.data.monthId);
        // this.setUsername(res.data.username);
        // window.localStorage.setItem(MONTHID, JSON.stringify(this.monthId));
        saveToStorage(TOKEN, this.token);
        saveToStorage<UserData>(USERDATA, {
          ...this.userData,
        });
        // window.localStorage.setItem(TOKEN, JSON.stringify(this.token));
        window.localStorage.setItem(TOKEN, JSON.stringify(this.token));
        // window.localStorage.setItem('username', JSON.stringify(this.username));
        history.push('/planner');
      });
    }
  };

  logout = async () => {
    removeFromStorage(TOKEN);
    removeFromStorage(USERDATA);
    // window.localStorage.removeItem(MONTHID);
    // window.localStorage.removeItem('username');
    this.token = null;
    this.userData = null;
    // this.monthId = null;
    // this.username = null;
    history.push('/login');
  };
}
