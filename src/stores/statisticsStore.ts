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
    } else if (store.monthStore.checkNewMonth) {
      this.habits = [];
      saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
      return;
    }
    this.habits = data.habits;
  };

  addToStats = (habit: Habit) => {
    const h = this.findHabit(habit);
    if (!h) {
      this.habits.push({
        habit,
        toDo: 1,
        completed: 0,
        missed: 0,
      });
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
    if (this.habits[index].habit && habit.completed) {
      this.habits[index].completed--;
      saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
    }
  };

  increaseMissedCount = (habit: Habit) => {
    const index = this.habits.findIndex(
      (el) => el.habit.habitName === habit.habitName
    );
    const foundHabit = this.habits[index].habit;
    if (foundHabit && !foundHabit.completed && !foundHabit.missed) {
      this.habits[index].missed++;
      foundHabit.missed = true;
      saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
    }
  };

  reduceMissedCount = (habit: Habit) => {
    const index = this.habits.findIndex(
      (el) => el.habit.habitName === habit.habitName
    );
    if (this.habits[index].habit) {
      this.habits[index].missed--;
      saveToStorage<Statistics>(STATISTICS, { habits: this.habits });
    }
  };

  removeHabit = (habit: string) => {
    this.habits = this.habits.filter((el) => el.habit.habitName !== habit);
    saveToStorage(STATISTICS, { habits: this.habits });
  };

  clearStatistics = () => {
    this.habits = [];
    saveToStorage(STATISTICS, { habits: this.habits });
  };

  renameHabit = (habit: string, newName: string) => {
    if (!this.habits.find((el) => el.habit.habitName === newName)) {
      this.habits = this.habits.map((el) =>
        el.habit.habitName === habit
          ? { ...el, habit: { ...el.habit, habitName: newName } }
          : el
      );
      saveToStorage(STATISTICS, { habits: this.habits });
    }
  };

  checkExistance = (newName: string) => {
    return this.habits.find((el) => el.habit.habitName === newName);
  };
}
