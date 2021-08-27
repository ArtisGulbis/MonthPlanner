import { makeAutoObservable, runInAction } from 'mobx';
import { DateTime } from 'luxon';
import agent from '../api/agent';
import { store } from './store';

export default class MonthStore {
  currentMonth = '';
  currentDay = DateTime.now().day;
  reset = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMonth = (name: string) => {
    this.currentMonth = name;
  };

  loadMonth = async () => {
    const res = await agent.Months.details();
    if (res) {
      runInAction(() => {
        this.currentMonth = res.name;
      });
      store.dayStore.setData(res.days);
    }
  };

  clearCurrentMonth = () => {
    this.currentMonth = DateTime.now().monthLong;
    this.reset = false;
  };
}
