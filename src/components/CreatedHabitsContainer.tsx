import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';
import CreatedHabitContainerElement from './CreatedHabitContainerElement';

const CreatedHabitsContainer = () => {
  const { createdHabitsStore } = useStore();
  return (
    <>
      {createdHabitsStore.habits.length ? (
        <div
          className={`
       bg-blue-300 bg-opacity-60 p-4 m-4 shadow-inner flex flex-row flex-wrap justify-center items-center`}
        >
          {createdHabitsStore.habits.map((el) => (
            <CreatedHabitContainerElement key={el} habit={el} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default observer(CreatedHabitsContainer);
