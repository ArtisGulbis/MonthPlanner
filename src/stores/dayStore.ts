import { makeAutoObservable } from 'mobx';
import { Day, Habit } from '../generated/graphql';
import dayService from '../services/dayService/dayService';
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

  clearDays = () => {
    this.days = [];
  };

  clearDaysOfHabit = (habitName: string) => {
    for (let i = 0; i < this.days.length; i++) {
      const day = this.days[i];
      day.habits = day.habits!.filter((habit) => habit.habitName !== habitName);
    }
  };

  checkPassedDays = async () => {
    const dayIds: string[] = [];
    const habitIds: string[] = [];
    for (let i = store.monthStore.currentDay - 2; i > 0; i--) {
      const day = this.days[i];
      if (!day.passed) {
        day.passed = true;
        dayIds.push(day.id);
        //check if habit has not been completed and has not been marked missed yet
        day.habits?.forEach(
          (habit) =>
            !habit.missed && !habit.completed && habitIds.push(habit.id)
        );
        continue;
      }
      break;
    }
    await dayService.setDayPassed({ dayIds });
    if (habitIds.length) {
      await store.statisticsStore.updateMissedHabits(habitIds);
    }
  };

  renameHabit = (habit: string, newName: string) => {
    if (
      this.days.every(
        (day) => !day.habits!.find((el) => el.habitName === newName)
      )
    ) {
      for (let i = 0; i < this.days.length; i++) {
        const day = this.days[i];
        day.habits = day.habits!.map((el) =>
          el.habitName === habit ? { ...el, habitName: newName } : el
        );
      }
    }
  };

  // checkExistance = (newName: string) => {
  //   return this.days.every((day) =>
  //     day.habits.find((el) => el.habitName === newName)
  //   );
  // };
}
