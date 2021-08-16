import { createContext, useContext } from 'react';
import { CreatedHabitsStore } from './createdHabitsStore';
import DayStore from './dayStore';
import ModalStore from './modalStore';
import { MonthStore } from './monthStore';
import StatisticsStore from './statisticsStore';
import { TutorialStore } from './tutorialStore';
import UserStore from './userStore';

export interface Store {
  dayStore: DayStore;
  monthStore: MonthStore;
  statisticsStore: StatisticsStore;
  createdHabitsStore: CreatedHabitsStore;
  modalStore: ModalStore;
  tutorialStore: TutorialStore;
  userStore: UserStore;
}

export const store: Store = {
  dayStore: new DayStore(),
  monthStore: new MonthStore(),
  statisticsStore: new StatisticsStore(),
  createdHabitsStore: new CreatedHabitsStore(),
  modalStore: new ModalStore(),
  tutorialStore: new TutorialStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
