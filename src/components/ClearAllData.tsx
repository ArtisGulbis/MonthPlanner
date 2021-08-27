import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';

const ClearAllData = () => {
  const { modalStore, dayStore, createdHabitsStore, statisticsStore } =
    useStore();

  const handleClick = async () => {
    // await habitService.deleteAllHabits({ userId: userStore.userData.id });
    modalStore.closeModal();
    dayStore.clearHabits();
    createdHabitsStore.clearHabits();
    statisticsStore.clearStatistics();
  };
  return (
    <div>
      <p>Clear All Data</p>
      <button onClick={handleClick}>Yes</button>
      <button onClick={modalStore.closeModal}>No</button>
    </div>
  );
};

export default observer(ClearAllData);
