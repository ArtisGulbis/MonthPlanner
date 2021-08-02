import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import './App.css';
import DayComponent from './components/DayComponent';
import StatisticsComponent from './components/StatisticsComponent';
import { Day } from './models/day';
import { useStore } from './stores/store';

function App() {
  const [days, setDays] = useState<Day[]>([]);
  const { habitStore, monthStore, statisticsStore, createdHabits } = useStore();

  useEffect(() => {
    monthStore.init();
    createdHabits.init();
    statisticsStore.loadStatistics();
    habitStore.generateDays();
    habitStore.checkPassedDays();
    setDays(habitStore.days);
  }, [habitStore, monthStore, statisticsStore, createdHabits]);

  return (
    <div className="bg-gray-100">
      <h1 className="italic tracking-widest text-indigo-700 font-bold text-9xl text-center mb-8">
        {monthStore.currentMonth}
      </h1>
      <div className="container w-11/12 m-auto">
        <div className="flex flex-col bg-blue-300 bg-opacity-50 rounded-md">
          {days.map((day) => (
            <DayComponent key={day.id} day={day} habits={day.habits} />
          ))}
        </div>
        <StatisticsComponent />
      </div>
    </div>
  );
}

export default observer(App);
