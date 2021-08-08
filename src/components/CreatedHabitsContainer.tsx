import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../stores/store';
import CreatedHabitContainerElement from './CreatedHabitContainerElement';

const CreatedHabitsContainer = () => {
  const { createdHabitsStore } = useStore();
  const [sticky, setSticky] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        setSticky('sticky');
      } else {
        setSticky('');
      }
    });
  }, []);

  return (
    <div
      className={`${sticky} rounded-md bg-blue-300 p-4 m-4 h-24 shadow-inner flex flex-row flex-wrap justify-center items-center`}
    >
      {createdHabitsStore.habits.map((el) => (
        <CreatedHabitContainerElement key={el} habit={el} />
      ))}
    </div>
  );
};

export default observer(CreatedHabitsContainer);
