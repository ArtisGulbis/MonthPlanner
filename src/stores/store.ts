import { createContext, useContext } from 'react';
import { CreatedHabitsStore } from './createdHabitsStore';
import DayStore from './dayStore';
import ModalStore from './modalStore';
import { MonthStore } from './monthStore';
import StatisticsStore from './statisticsStore';

export interface Store {
  dayStore: DayStore;
  monthStore: MonthStore;
  statisticsStore: StatisticsStore;
  createdHabitsStore: CreatedHabitsStore;
  modalStore: ModalStore;
}

export const store: Store = {
  dayStore: new DayStore(),
  monthStore: new MonthStore(),
  statisticsStore: new StatisticsStore(),
  createdHabitsStore: new CreatedHabitsStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
