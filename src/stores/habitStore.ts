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

export default class HabitStore {
  days: Day[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  generateDays = () => {
    let data = getFromStorage<Day[]>(DAYS);
    if (!data) {
      this.createData();
    } else if (data && store.monthStore.checkNewMonth) {
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
    for (let i = 1; i < daysInMonth; i++) {
      this.days.push({
        id: uuidv4(),
        dayNumber: i,
        habits: [],
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
      // const index =
      this.days[dayIndex].habits.splice(habitIndex, 1);
      // day.habits.splice(index, 1);
      // this.days = this.days.map((d) =>
      //   d.id === dayId ? { ...day!, habits: day!.habits } : d
      // );
      saveToStorage<Day[]>(DAYS, this.days);
    }
  };
}
