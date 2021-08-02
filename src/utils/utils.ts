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

export const shortenText = (text: string) => {
  const textLength = 10;
  if (text.length > 10) {
    const a = text.split('');
    const b = a.splice(0, textLength);
    b.push('.');
    b.push('.');
    b.push('.');
    return b;
  }
  return text;
};

//keys for localstorage
export const DAYS = 'days';
export const MONTH = 'month';
export const STATISTICS = 'statistics';
export const HABITS = 'habits';
