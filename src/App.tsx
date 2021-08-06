import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import './App.css';
import BackToTopComponent from './components/BackToTopComponent';
import CalendarHeaderComponent from './components/CalendarHeaderComponent';
import ClearDataMotal from './components/ClearDataMotal';
import DayComponent from './components/DayComponent';
import HideDaysButton from './components/HideDaysButton';
import StatisticsComponent from './components/StatisticsComponent';
import { Day } from './models/day';
import { useStore } from './stores/store';

function App() {
  const [days, setDays] = useState<Day[]>([]);
  const [hidden, setHidden] = useState(true);
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
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 pb-8">
      <ClearDataMotal />
      <h1
        id="top"
        className="font-sans italic tracking-widest text-indigo-700 font-normal underline text-9xl text-center mb-12"
      >
        {monthStore.currentMonth}
      </h1>
      <CalendarHeaderComponent days={days} />
      <div className="container w-11/12 m-auto">
        <div className="flex relative flex-col bg-blue-300 shadow-inner bg-opacity-50 rounded-md p-2 2xl:p-8">
          <HideDaysButton hidden={hidden} setHidden={setHidden} />
          {days.map((day) =>
            hidden && day.passed ? null : (
              <DayComponent key={day.id} day={day} habits={day.habits} />
            )
          )}
        </div>
        <StatisticsComponent />
      </div>
      <BackToTopComponent />
    </div>
  );
}

export default observer(App);
