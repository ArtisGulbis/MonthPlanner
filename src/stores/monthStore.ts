import { makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';

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

  get checkNewMonth() {
    return this.currentMonth !== DateTime.now().monthLong;
  }

  setNewMonth = () => {
    this.currentMonth = DateTime.now().monthLong;
  };

  clearCurrentMonth = () => {
    this.currentMonth = DateTime.now().monthLong;
    this.reset = false;
  };
}
