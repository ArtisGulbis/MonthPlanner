import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../stores/store';
import CreatedHabitContainerElement from './CreatedHabitContainerElement';
import Info from './Info';

const CreatedHabitsContainer = () => {
  const { createdHabitsStore } = useStore();
  const [sticky, setSticky] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400 && createdHabitsStore.habits.length) {
        setSticky('sticky');
      } else {
        setSticky('');
      }
    });
    createdHabitsStore.sort();
  }, [
    createdHabitsStore.habits.length,
    createdHabitsStore.habits,
    createdHabitsStore,
  ]);

  return (
    <div
      className={`${sticky} rounded-md bg-blue-300 p-3 m-4 min-h-min min-h shadow-inner flex flex-row relative flex-wrap justify-center items-center`}
    >
      {createdHabitsStore.habits.map((el) => (
        <CreatedHabitContainerElement key={el} habit={el} />
      ))}
      <Info
        content="Double click on title to edit."
        styling={`absolute bottom-2 right-0 w-9 h-9`}
      />
    </div>
  );
};

export default observer(CreatedHabitsContainer);
