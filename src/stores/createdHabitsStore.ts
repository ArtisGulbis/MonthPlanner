import { makeAutoObservable } from 'mobx';
import { Habits } from '../models/habits';
import { getFromStorage, HABITS, saveToStorage } from '../utils/utils';

export class CreatedHabitsStore {
  habits: string[] = [];
  currentlySelectedHabit = '';
  open = false;
  constructor() {
    makeAutoObservable(this);
    // reaction(
    //   () => this.habits,
    //   (habits) => (this.habits = habits.sort())
    // );
  }

  sort = () => {
    this.habits.sort();
  };

  openModal = (habit: string) => {
    this.open = true;
    this.currentlySelectedHabit = habit;
  };

  closeModal = () => {
    this.open = false;
    this.currentlySelectedHabit = '';
  };

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
    this.habits = this.habits.filter((el) => el !== habit);
    saveToStorage<Habits>(HABITS, { habits: this.habits });
  };

  clearHabits = () => {
    this.habits = [];
    saveToStorage<Habits>(HABITS, { habits: this.habits });
  };

  renameHabit = (habit: string, newName: string) => {
    if (!this.habits.includes(newName)) {
      this.habits = this.habits.map((el) => (el === habit ? newName : el));
      saveToStorage<Habits>(HABITS, { habits: this.habits });
    }
  };

  checkExistance = (newName: string) => {
    if (this.habits.includes(newName)) {
      return true;
    }
    return false;
  };
}
