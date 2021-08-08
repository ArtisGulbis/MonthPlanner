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
  store.dayStore.clearHabits();
  store.statisticsStore.clearStatistics();
  store.monthStore.clearCurrentMonth();
  store.createdHabitsStore.clearHabits();
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

const completionStyles = (color: string) => {
  return `bg-${color}-300 text-${color}-700`;
};

const refStyles = (color: string) => {
  return `bg-${color}-200`;
};

const completionStylesHighlited = (color: string) => {
  return `hover:bg-${color}-500 hover:text-${color}-200`;
};

export const buttonStyles = () => {
  return `fill-current text-blue-700 hover:text-blue-500 cursor-pointer transform hover:scale-125 duration-75`;
};
export const inputOutline = () => {
  return `text-blue-600 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`;
};

export const checkCompletion = (
  day: Day,
  currentDay: number,
  highlight: boolean,
  ref?: boolean
) => {
  const passedDay = `${completionStyles('blue')} ${
    highlight && completionStylesHighlited('blue')
  } ${ref && refStyles('blue')}`;
  const completedDay = `${completionStyles('green')} ${
    highlight && completionStylesHighlited('green')
  } ${ref && refStyles('green')}`;
  const todoDay = `${completionStyles('yellow')} ${
    highlight && completionStylesHighlited('yellow')
  } ${ref && refStyles('yellow')}`;
  const currentD = `${completionStyles('pink')} ${
    highlight && completionStylesHighlited('pink')
  } ${ref && refStyles('pink')}`;

  if (day.passed && checkAllCompletedHabits(day)) {
    return completedDay;
  } else if (day.passed) {
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
