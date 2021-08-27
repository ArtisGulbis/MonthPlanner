import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { history } from '..';
import agent from '../api/agent';
import { AccessToken } from '../models/userData';
// import { UserData } from '../models/userData';
import { removeFromStorage, saveToStorage, USERDATA } from '../utils/utils';
import { store } from './store';

export const TOKEN = 'jwt';
export default class UserStore {
  // userData: UserData | null = getFromStorage<UserData>(USERDATA);
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

  // setUserData = (userData: UserData) => {
  //   this.userData = userData;
  // };

  setData = (jwtResponse: AccessToken) => {
    const { access_token } = jwtResponse;
    this.setToken(access_token);
    saveToStorage(TOKEN, this.token);
  };

  register = async (username: string, password: string) => {
    try {
      const res = await agent.Account.register({ username, password });
      if (res) {
        runInAction(() => {
          this.setData(res);
        });
        store.modalStore.closeModal();
        history.push('/planner');
      }
    } catch (error) {
      throw error.response.data.message;
    }
  };

  get isLoggedIn() {
    return !!this.token;
  }

  login = async (username: string, password: string) => {
    try {
      const res = await agent.Account.login({ username, password });
      if (res) {
        runInAction(() => {
          this.setData(res);
        });
        history.push('/planner');
        store.modalStore.closeModal();
      }
    } catch (error) {
      throw error.response.data.message;
    }
  };

  logout = () => {
    removeFromStorage(TOKEN);
    removeFromStorage(USERDATA);
    this.token = null;
    // this.userData = null;
    store.dayStore.clearDays();
    store.createdHabitsStore.clearHabits();
    store.statisticsStore.clearStatistics();
    history.push('/');
  };
}
