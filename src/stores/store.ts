import { createContext, useContext } from 'react';
import { CreatedHabitsStore } from './createdHabitsStore';
import DayStore from './dayStore';
import ModalStore from './modalStore';
import MonthStore from './monthStore';
import StatisticsStore from './statisticsStore';

interface Store {
  dayStore: DayStore;
  monthStore: MonthStore;
  statisticsStore: StatisticsStore;
  createdHabits: CreatedHabitsStore;
  modalStore: ModalStore;
}

export const store: Store = {
  dayStore: new DayStore(),
  monthStore: new MonthStore(),
  statisticsStore: new StatisticsStore(),
  createdHabits: new CreatedHabitsStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
