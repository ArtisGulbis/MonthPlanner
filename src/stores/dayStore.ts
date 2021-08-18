import { makeAutoObservable } from 'mobx';
import { Day, Habit } from '../generated/graphql';
import { store } from './store';

export default class DayStore {
  days: Day[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setData = (days: Day[]) => {
    this.days = days;
  };

  addHabit = (dayId: string, habit: Habit) => {
    let day = this.days.find((el) => el.id === dayId);
    if (day?.habits) {
      day.habits.push(habit);
      this.days.filter((el) => (el.id !== dayId ? el : day));
    }
  };

  completeHabit = (dayId: string, habitId: string, state: boolean) => {
    let dayIndex = this.days.findIndex((el) => el.id === dayId);
    if (this.days[dayIndex]) {
      const habitIndex = this.days[dayIndex].habits!.findIndex(
        (el) => el.id === habitId
      );
      console.log(state);
      this.days[dayIndex].habits![habitIndex].completed = state;
    }
  };

  removeHabit = (dayId: string, habitId: string) => {
    const dayIndex = this.days.findIndex((el) => el.id === dayId);
    if (this.days[dayIndex]) {
      this.days[dayIndex].habits = this.days[dayIndex].habits?.filter(
        (el) => el.id !== habitId
      );
    }
  };

  clearHabits = () => {
    this.days.forEach((day) => (day.habits = []));
  };

  // clearDaysOfHabit = (habitName: string) => {
  //   for (let i = 0; i < this.days.length; i++) {
  //     const day = this.days[i];
  //     day.habits = day.habits.filter((habit) => habit.habitName !== habitName);
  //   }
  //   saveToStorage<Day[]>(DAYS, this.days);
  // };

  checkPassedDays = () => {
    for (let i = 0; i < store.monthStore.currentDay - 1; i++) {
      const day = this.days[i];
      day.passed = true;
      day.habits!.forEach((el) => {
        if (!el.completed && !el.missed) {
          store.statisticsStore.increaseMissedCount(el);
        }
      });
    }
  };

  // renameHabit = (habit: string, newName: string) => {
  //   if (
  //     this.days.every(
  //       (day) => !day.habits.find((el) => el.habitName === newName)
  //     )
  //   ) {
  //     for (let i = 0; i < this.days.length; i++) {
  //       const day = this.days[i];
  //       day.habits = day.habits.map((el) =>
  //         el.habitName === habit ? { ...el, habitName: newName } : el
  //       );
  //     }
  //     saveToStorage<Day[]>(DAYS, this.days);
  //   }
  // };

  // checkExistance = (newName: string) => {
  //   return this.days.every((day) =>
  //     day.habits.find((el) => el.habitName === newName)
  //   );
  // };
}
