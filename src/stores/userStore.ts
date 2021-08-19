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
import { JwtResponse } from '../generated/graphql';
import { store } from './store';

export const MONTHID = 'monthId';
export const TOKEN = 'token';
export default class UserStore {
  userData: UserData | null = getFromStorage<UserData>(USERDATA);
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
  }

  setToken = (token: string | null) => {
    this.token = token;
  };

  setUserData = (userData: UserData) => {
    this.userData = userData;
  };

  setData = (jwtResponse: JwtResponse) => {
    const { access_token, id, monthId, username } = jwtResponse;
    this.setToken(access_token);
    this.setUserData({
      id: id,
      monthId: monthId,
      username: username,
    });
    saveToStorage(TOKEN, this.token);
    saveToStorage<UserData>(USERDATA, {
      ...this.userData,
    });
    window.localStorage.setItem(TOKEN, JSON.stringify(this.token));
    history.push('/planner');
  };

  register = async (username: string, password: string) => {
    const res = await userService.register(username, password);
    if (res?.register) {
      runInAction(() => {
        this.setData(res?.register);
      });
    }
  };

  get isLoggedIn() {
    return !!this.token;
  }

  login = async (username: string, password: string) => {
    const res = await axios.post<JwtResponse>(
      'http://localhost:5000/auth/login',
      {
        username,
        password,
      }
    );
    if (res.data) {
      runInAction(() => {
        this.setData(res.data);
      });
    }
  };

  logout = () => {
    removeFromStorage(TOKEN);
    removeFromStorage(USERDATA);
    this.token = null;
    this.userData = null;
    store.dayStore.clearDays();
    store.createdHabitsStore.clearHabits();
    store.statisticsStore.clearStatistics();
    history.push('/');
  };
}
