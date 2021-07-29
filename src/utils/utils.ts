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
};

//key/-s for localstorage
export const DAYS = 'days';
export const MONTH = 'month';
export const STATISTICS = 'statistics';
