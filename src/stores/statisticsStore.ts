import { makeAutoObservable } from 'mobx';
import { Habit } from '../models/habit';
import { HabitStats } from '../models/habitStats';
import { Statistics } from '../models/statistics';
import { getFromStorage, saveToStorage, STATISTICS } from '../utils/utils';
import { store } from './store';

export default class StatisticsStore {
  habits: HabitStats[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadStatistics = () => {
    const data = getFromStorage<Statistics>(STATISTICS);
    if (!data) {
      const statistics: Statistics = {
        habits: this.habits,
      };
      saveToStorage<Statistics>(STATISTICS, statistics);
      return;
    } else if (data && store.monthStore.checkNewMonth) {
      this.habits = [];
      return;
    }
    this.habits = data.habits;
  };

  addToStats = (habit: Habit) => {
    const h = this.findHabit(habit);
    if (!h) {
      this.habits.push({ habit, toDo: 1, completed: 0 });
      saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
    } else {
      h.toDo++;
      saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
    }
  };

  findHabit = (habit: Habit) => {
    return this.habits.find((el) => el.habit.habitName === habit.habitName);
  };

  reduceHabitCount = (habit: Habit) => {
    const h = this.findHabit(habit);
    if (h) {
      h.toDo--;
      if (h.toDo === 0) {
        this.habits = this.habits.filter(
          (el) => el.habit.habitName !== h.habit.habitName
        );
        saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
      } else {
        //  this.reduceCompletedCount(h);
        saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
      }
    }
  };

  increaseCompletedCount = (habit: Habit) => {
    const index = this.habits.findIndex(
      (el) => el.habit.habitName === habit.habitName
    );
    if (index === 0 || index) {
      this.habits[index].completed++;
      saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
    }
  };

  reduceCompletedCount = (habit: Habit) => {
    const index = this.habits.findIndex(
      (el) => el.habit.habitName === habit.habitName
    );
    if (this.habits[index] && this.habits[index].completed) {
      this.habits[index].completed--;
    }
    saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
  };

  clearStatistics = () => {
    this.habits.splice(0, this.habits.length);
    this.loadStatistics();
    saveToStorage(STATISTICS, { habits: this.habits });
  };
}
