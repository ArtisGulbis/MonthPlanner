import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { clearLocalStorage } from '../utils/utils';

const ModalContainer = () => {
  const { modalStore, statisticsStore, createdHabitsStore } = useStore();

  const onYesClearData = () => {
    modalStore.closeModal();
    clearLocalStorage();
  };

  const handleClick = (habit: string) => {
    // dayStore.clearDaysOfHabit(habit);
    statisticsStore.removeHabit(habit);
    createdHabitsStore.removeHabit(habit);
    createdHabitsStore.closeModal();
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

export default ModalContainer;
