import { makeAutoObservable } from 'mobx';
import { Habit } from '../generated/graphql';
import { HabitStats } from '../models/habitStats';
import habitService from '../services/habitService/habitService';

export default class StatisticsStore {
  habits: HabitStats[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  createStatistics = (habits: Habit[]) => {
    habits.forEach((el) => {
      let habitStat = this.habits.find(
        (habitStat) => habitStat.habit.habitName === el.habitName
      );

      if (habitStat) {
        habitStat.toDo++;
        habitStat.missed += el.missed ? 1 : 0;
        habitStat.completed += el.completed ? 1 : 0;
      } else {
        let habitStats: HabitStats = {
          completed: el.completed ? 1 : 0,
          habit: {
            completed: el.completed,
            habitName: el.habitName,
            id: el.id,
            missed: el.missed,
          },
          missed: el.missed ? 1 : 0,
          toDo: 1,
        };
        this.habits.push(habitStats);
      }
    });
  };

  addToStats = (habit: Habit) => {
    const h = this.findHabit(habit);
    if (!h) {
      this.habits.push({
        habit,
        toDo: 1,
        completed: habit.completed ? 1 : 0,
        missed: habit.missed ? 1 : 0,
      });
    } else {
      h.toDo++;
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
      }
    }
  };

  increaseCompletedCount = (habit: Habit) => {
    const foundHabit = this.findHabit(habit);
    if (foundHabit) {
      foundHabit.completed++;
    }
  };

  reduceCompletedCount = (habit: Habit) => {
    const foundHabit = this.findHabit(habit);
    if (foundHabit && habit.completed) {
      foundHabit.completed--;
    }
  };

  updateMissedHabits = async (habitIds: string[]) => {
    await habitService.updateHabitMissed({ habitIds });
  };

  // checkMissedHabits = async () => {
  // const missedHabits: string[] = [];
  // for (let i = store.monthStore.currentDay - 2; i > 0; i--) {
  // const habitStats = this.habits[i];
  // if (!habitStats.habit.missed && !habitStats.habit.completed) {
  // missedHabits.push(habitStats.habit.id);
  // habitStats.habit.missed = true;
  // habitStats.missed++;
  // }
  // }
  // };

  reduceMissedCount = (habit: Habit) => {
    const index = this.habits.findIndex(
      (el) => el.habit.habitName === habit.habitName
    );
    if (this.habits[index].habit) {
      this.habits[index].missed--;
    }
  };

  removeHabit = (habit: string) => {
    this.habits = this.habits.filter((el) => el.habit.habitName !== habit);
  };

  clearStatistics = () => {
    this.habits = [];
  };

  renameHabit = (habit: string, newName: string) => {
    const foundHabit = this.habits.find((el) => el.habit.habitName === habit);
    if (foundHabit) {
      this.habits = this.habits.map((el) =>
        el.habit.habitName === foundHabit.habit.habitName
          ? { ...el, habit: { ...el.habit, habitName: newName } }
          : el
      );
    }
  };

  checkExistance = (newName: string) => {
    return this.habits.find((el) => el.habit!.habitName === newName);
  };
}
