import { makeAutoObservable } from 'mobx';
import { Day } from '../models/day';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import {
  DAYS,
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from '../utils/utils';
import { Habit } from '../models/habit';
import { store } from './store';
const now = DateTime.now();

export default class DayStore {
  days: Day[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  generateDays = () => {
    let data = getFromStorage<Day[]>(DAYS);
    if (!data) {
      this.createData();
    } else if (store.monthStore.checkNewMonth) {
      //new month started
      this.days = [];
      removeFromStorage(DAYS);
      this.createData();
      return;
    }
    //still in current month => load data
    this.days = getFromStorage<Day[]>(DAYS);
  };

  createData = () => {
    const daysInMonth = now.daysInMonth;
    const startOfMonth = DateTime.now().startOf('month');
    for (let i = 1; i < daysInMonth + 1; i++) {
      this.days.push({
        id: uuidv4(),
        dayNumber: i,
        habits: [],
        weekDay: startOfMonth.plus({ days: i - 1 }).weekdayShort,
        passed: false,
      });
    }
    saveToStorage(DAYS, this.days);
  };

  addHabit = (id: string, habit: Habit) => {
    let day = this.days.find((el) => el.id === id);
    if (day) {
      day.habits.push(habit);
      saveToStorage<Day[]>(DAYS, this.days);
    }
  };

  completeHabit = (dayId: string, habitId: string, state: boolean) => {
    let dayIndex = this.days.findIndex((el) => el.id === dayId);
    if (dayIndex === 0 || dayIndex) {
      const habitIndex = this.days[dayIndex].habits.findIndex(
        (el) => el.id === habitId
      );
      this.days[dayIndex].habits[habitIndex].completed = state;
      saveToStorage<Day[]>(DAYS, this.days);
    }
  };

  removeHabit = (dayId: string, habitId: string) => {
    const dayIndex = this.days.findIndex((el) => el.id === dayId);
    if (dayIndex === 0 || dayIndex) {
      const habitIndex = this.days[dayIndex].habits.findIndex(
        (el) => el.id === habitId
      );
      this.days[dayIndex].habits.splice(habitIndex, 1);
      saveToStorage<Day[]>(DAYS, this.days);
    }
  };

  clearHabits = () => {
    this.days.forEach((day) => (day.habits = []));
    saveToStorage<Day[]>(DAYS, this.days);
  };

  clearDaysOfHabit = (habitName: string) => {
    for (let i = 0; i < this.days.length; i++) {
      const day = this.days[i];
      day.habits = day.habits.filter((habit) => habit.habitName !== habitName);
    }
    saveToStorage<Day[]>(DAYS, this.days);
  };

  checkPassedDays = () => {
    for (let i = 0; i < store.monthStore.currentDay - 1; i++) {
      const day = this.days[i];
      day.passed = true;
      day.habits.forEach(
        (el) =>
          !el.completed &&
          !el.missed &&
          store.statisticsStore.increaseMissedCount(el)
      );
    }
  };
}
