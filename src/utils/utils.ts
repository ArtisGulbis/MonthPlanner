// import { store } from '../stores/store';

import { Day } from '../models/day';
import { store } from '../stores/store';

export const saveToStorage = <T>(key: string, data: T) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = <T>(key: string): T => {
  return JSON.parse(window.localStorage.getItem(key)!);
};

export const removeFromStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
  // store.habitStore.clearHabits();
  // store.statisticsStore.clearStatistics();
  // store.monthStore.clearCurrentMonth();
  window.location.reload();
};

export const shortenText = (text: string, length: number) => {
  if (text.length > length) {
    const a = text.split('');
    const b = a.splice(0, length);
    b.push('.');
    b.push('.');
    b.push('.');
    return b;
  }
  return text;
};

export const checkAllCompletedHabits = (day: Day) => {
  return day.habits.length && day.habits.every((el) => el.completed);
};

export const checkCompletion = (
  day: Day,
  currentDay: number,
  highlight: boolean
) => {
  const passedDay = `bg-blue-300 text-blue-700 ${
    highlight && 'hover:bg-blue-500'
  }`;
  const completedDay = `bg-green-300 text-green-700 ${
    highlight && 'hover:bg-green-500'
  }`;
  const todoDay = `bg-yellow-300 text-yellow-700 ${
    highlight && 'hover:bg-yellow-500'
  }`;
  const currentD = `bg-pink-300 text-pink-700 ${
    highlight && 'hover:bg-pink-500'
  }`;

  if (day.passed) {
    return passedDay;
  }
  if (currentDay === day.dayNumber) {
    if (checkAllCompletedHabits(day)) {
      return completedDay;
    }
    return currentD;
  } else if (checkAllCompletedHabits(day)) {
    return completedDay;
  }
  return todoDay;
};

//keys for localstorage
export const DAYS = 'days';
export const MONTH = 'month';
export const STATISTICS = 'statistics';
export const HABITS = 'habits';
