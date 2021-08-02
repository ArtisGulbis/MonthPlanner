import { createContext, useContext } from 'react';
import { CreatedHabits } from './createdHabits';
import HabitStore from './habitStore';
import MonthStore from './monthStore';
import StatisticsStore from './statisticsStore';

interface Store {
  habitStore: HabitStore;
  monthStore: MonthStore;
  statisticsStore: StatisticsStore;
  createdHabits: CreatedHabits;
}

export const store: Store = {
  habitStore: new HabitStore(),
  monthStore: new MonthStore(),
  statisticsStore: new StatisticsStore(),
  createdHabits: new CreatedHabits(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
