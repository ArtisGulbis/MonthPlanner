import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';
import { clearLocalStorage, shortenText } from '../utils/utils';
import LegendComponent from './LegendComponent';

const StatisticsComponent = () => {
  const { statisticsStore } = useStore();

  return (
    <div className="bg-purple-200 w-full rounded-md">
      <button
        onClick={clearLocalStorage}
        className="w-full bg-yellow-400 hover:bg-yellow-200 py-4 rounded-t-md"
      >
        Clear
      </button>
      <div className="flex flex-col">
        <LegendComponent text="Completed" color="green" />
        <LegendComponent text="Missed" color="red" />
        <LegendComponent text="Completion Rate" color="blue" />
      </div>
      {statisticsStore.habits.map(
        ({ habit: { habitName, id }, toDo, completed, missed }) => (
          <div
            key={id}
            className="bg-purple-400 m-2 mt-4 text-center rounded-md "
          >
            <p className="p-2 capitalize">{shortenText(habitName)}</p>
            <div className="flex bg-purple-600 justify-around items-center rounded-b-md shadow-md">
              <div className="bg-green-200 p-2 h-full flex-grow rounded-bl-md">
                {completed}/{toDo}
              </div>
              <div className="bg-red-400 h-full p-2 flex-grow">
                {missed}/{toDo}
              </div>
              <div className="bg-blue-300 h-full p-2 flex-grow rounded-br-md">
                {Math.round((completed / toDo) * 100)} %
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default observer(StatisticsComponent);
