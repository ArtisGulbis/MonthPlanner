import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';

const StatisticsComponent = () => {
  const { statisticsStore } = useStore();
  return (
    <>
      {}
      {statisticsStore.habits.map((el) => (
        <h3 key={el.habit.habitName}>
          {el.habit.habitName} : {el.completed}/{el.toDo}
        </h3>
      ))}
    </>
  );
};

export default observer(StatisticsComponent);
