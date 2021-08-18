import { makeAutoObservable } from 'mobx';

export class CreatedHabitsStore {
  habits: string[] = [];
  currentlySelectedHabit = '';
  open = false;
  constructor() {
    makeAutoObservable(this);
  }

  openModal = (habit: string) => {
    this.open = true;
    this.currentlySelectedHabit = habit;
  };

  setData = (userHabits: any[]) => {
    this.habits = userHabits;
  };

  closeModal = () => {
    this.open = false;
    this.currentlySelectedHabit = '';
  };

  addHabit = (habit: string) => {
    if (!this.habits.includes(habit)) {
      this.habits.push(habit);
    }
  };

  removeHabit = (habit: string) => {
    this.habits = this.habits.filter((el) => el !== habit);
  };

  clearHabits = () => {
    this.habits = [];
  };

  renameHabit = (habit: string, newName: string) => {
    if (!this.habits.includes(newName)) {
      const i = this.habits.findIndex((el) => el === habit);
      this.habits[i] = newName;
    }
  };

  checkExistance = (newName: string) => {
    return this.habits.includes(newName);
  };
}
