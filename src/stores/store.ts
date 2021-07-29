import { createContext, useContext } from 'react';
import HabitStore from './habitStore';
import MonthStore from './monthStore';
import StatisticsStore from './statisticsStore';

interface Store {
  habitStore: HabitStore;
  monthStore: MonthStore;
  statisticsStore: StatisticsStore;
}

export const store: Store = {
  habitStore: new HabitStore(),
  monthStore: new MonthStore(),
  statisticsStore: new StatisticsStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
