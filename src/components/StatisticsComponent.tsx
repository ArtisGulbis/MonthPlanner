import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';
import { shortenText } from '../utils/utils';
import LegendComponent from './LegendComponent';
import StatisticsContentComponent from './StatisticsContentComponent';

const StatisticsComponent = () => {
  const { statisticsStore, modalStore } = useStore();
  const { openModal } = modalStore;

  return (
    <div className="bg-blue-300 bg-opacity-50 shadow-inner w-full rounded-md">
      <button
        onClick={openModal}
        className="w-full bg-red-400 font-light text-red-900 hover:bg-red-300 py-4 rounded-t-md text-xl tracking-widest"
      >
        Clear
      </button>
      <div className="flex flex-col mt-3">
        <LegendComponent text="Completed" color="green" />
        <LegendComponent text="Missed" color="red" />
        <LegendComponent text="Completion Rate" color="blue" />
      </div>
      {statisticsStore.habits.map(
        ({ habit: { habitName, id }, toDo, completed, missed }) => (
          <div
            key={id}
            className={`${
              toDo === completed ? 'bg-green-300' : 'bg-yellow-300'
            } text-indigo-800 m-2 mt-4 text-center rounded-md flex flex-col shadow-lg h-28`}
          >
            <div className="flex items-center justify-center flex-grow">
              <p className="text-2xl font-light tracking-widest capitalize">
                {shortenText(habitName, 15)}
              </p>
            </div>
            <div className="flex bg-purple-600 mt-auto justify-around items-center rounded-b-md">
              <StatisticsContentComponent
                content={`${completed}/${toDo}`}
                color="green"
                additionalStyle="rounded-bl-md"
              />
              <StatisticsContentComponent
                content={`${missed}/${toDo}`}
                color="red"
              />
              <StatisticsContentComponent
                content={`${Math.round((completed / toDo) * 100)} %`}
                color="blue"
                additionalStyle="rounded-br-md"
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default observer(StatisticsComponent);
