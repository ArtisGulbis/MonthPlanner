import React from 'react';
import habitService from '../services/habitService/habitService';
import { useStore } from '../stores/store';

interface Props {
  habit: string;
}

const DeleteSpecificHabits = ({ habit }: Props) => {
  const {
    modalStore,
    dayStore,
    userStore,
    createdHabitsStore,
    statisticsStore,
  } = useStore();

  const handleClick = (habit: string) => {
    if (userStore.userData?.id) {
      habitService.deleteHabits({
        userId: userStore.userData.id,
        habitName: habit,
      });
    }
    statisticsStore.removeHabit(habit);
    dayStore.clearDaysOfHabit(habit);
    createdHabitsStore.removeHabit(habit);
    statisticsStore.removeHabit(habit);
    modalStore.closeModal();
  };

  return (
    <div>
      <p>Delet all instances of specific Habit?</p>
      <button onClick={() => handleClick(habit)}>Yes</button>
      <button onClick={modalStore.closeModal}>No</button>
    </div>
  );
};

export default DeleteSpecificHabits;
