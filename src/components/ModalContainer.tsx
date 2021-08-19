import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';
import Modal from '../components/Modal';
import habitService from '../services/habitService/habitService';

const ModalContainer = () => {
  const {
    modalStore,
    dayStore,
    userStore,
    createdHabitsStore,
    statisticsStore,
  } = useStore();

  //handles clearing ALL the data
  const onYesClearData = async () => {
    if (userStore.userData?.id) {
      await habitService.deleteAllHabits({ userId: userStore.userData.id });
      modalStore.closeModal();
      dayStore.clearHabits();
      createdHabitsStore.clearHabits();
      statisticsStore.clearStatistics();
    }
  };

  //handles clearing one specific habit
  const handleClick = (habit: string) => {
    if (userStore.userData?.id) {
      habitService.deleteHabits({
        userId: userStore.userData.id,
        habitName: habit,
      });
    }
    // statisticsStore.removeHabit(habit);
    dayStore.clearDaysOfHabit(habit);
    createdHabitsStore.removeHabit(habit);
    createdHabitsStore.closeModal();
    statisticsStore.removeHabit(habit);
  };
  return (
    <>
      <Modal
        onYes={onYesClearData}
        text="Do you want to clear all data?"
        onNo={() => modalStore.closeModal()}
        onClose={() => modalStore.closeModal()}
        open={modalStore.open}
      />
      <Modal
        open={createdHabitsStore.open}
        text={`Clear all instances of ${createdHabitsStore.currentlySelectedHabit}`}
        onYes={() => handleClick(createdHabitsStore.currentlySelectedHabit)}
        onClose={() => createdHabitsStore.closeModal()}
        onNo={() => createdHabitsStore.closeModal()}
      />
    </>
  );
};

export default observer(ModalContainer);
