import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import './App.css';
import DayComponent from './components/DayComponent';
import StatisticsComponent from './components/StatisticsComponent';
import { Day } from './models/day';
import { useStore } from './stores/store';

function App() {
  const [days, setDays] = useState<Day[]>([]);
  const { habitStore, monthStore, statisticsStore } = useStore();

  useEffect(() => {
    monthStore.init();
    statisticsStore.loadStatistics();
    habitStore.generateDays();
    setDays(habitStore.days);
  }, [habitStore, monthStore, statisticsStore]);

  return (
    <>
      <h1 className="text-9xl text-center">Month name</h1>
      <div className="container w-11/12 m-auto ">
        <div className="flex justify-start flex-wrap bg-red-100">
          {days.map((day) => (
            <DayComponent key={day.id} day={day} habits={day.habits} />
          ))}
        </div>
        <StatisticsComponent />
      </div>
    </>
  );
}

export default observer(App);
