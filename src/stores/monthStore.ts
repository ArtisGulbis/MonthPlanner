import { makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';
import { getFromStorage, MONTH, saveToStorage } from '../utils/utils';
import { Month } from '../models/month';

export default class MonthStore {
  currentMonth = '';
  currentDay = DateTime.now().day;
  reset = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    const data = getFromStorage<Month>(MONTH);
    //first time with no data whatsoever
    if (!data) {
      this.currentMonth = DateTime.now().monthLong;
      this.reset = false;
      saveToStorage<Month>(MONTH, {
        currentMonth: this.currentMonth,
        reset: this.reset,
      });
      //data exists
    } else if (data) {
      this.currentMonth = data.currentMonth;
      this.reset = data.reset;
      if (this.checkNewMonth) {
        //set reset flag to create new data
        this.reset = true;
        this.currentMonth = DateTime.now().monthLong;
      }
    }
  };

  get checkNewMonth() {
    // check if current month equals the actual current month (now)
    return this.currentMonth !== DateTime.now().monthLong;
  }

  setNewMonth = () => {
    this.currentMonth = DateTime.now().monthLong;
  };

  clearCurrentMonth = () => {
    this.currentMonth = '';
    this.reset = false;
    this.init();
  };
}
