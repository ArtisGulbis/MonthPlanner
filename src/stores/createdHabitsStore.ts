import { makeAutoObservable } from 'mobx';
import { Habits } from '../models/habits';
import { getFromStorage, HABITS, saveToStorage } from '../utils/utils';

export class CreatedHabitsStore {
  habits: string[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    const data = getFromStorage<Habits>(HABITS);
    if (!data) {
      const habits: Habits = {
        habits: this.habits,
      };
      saveToStorage<Habits>(HABITS, habits);
      return;
    }
    this.habits = data.habits;
  };

  addHabit = (habit: string) => {
    if (!this.habits.includes(habit)) {
      this.habits.push(habit);
      saveToStorage<Habits>(HABITS, { habits: this.habits });
    }
  };

  removeHabit = (habit: string) => {
    const index = this.habits.findIndex((el) => el === habit);
    this.habits.splice(index, 1);
    saveToStorage<Habits>(HABITS, { habits: this.habits });
  };

  clearHabits = () => {
    this.habits = [];
    saveToStorage<Habits>(HABITS, { habits: this.habits });
  };
}
