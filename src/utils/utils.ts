// import { store } from '../stores/store';

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

//key/-s for localstorage
export const DAYS = 'days';
export const MONTH = 'month';
export const STATISTICS = 'statistics';
