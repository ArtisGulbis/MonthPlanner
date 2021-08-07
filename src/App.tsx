import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import './App.css';
import BackToTop from './components/BackToTop';
import CalendarHeader from './components/CalendarHeader';
import ClearDataMotal from './components/ClearDataMotal';
import DayCard from './components/DayCard';
import HideDaysButton from './components/HideDaysButton';
import Statistics from './components/Statistics';
import { Day } from './models/day';
import { useStore } from './stores/store';

function App() {
  const [days, setDays] = useState<Day[]>([]);
  const [hidden, setHidden] = useState(true);
  const { dayStore, monthStore, statisticsStore, createdHabits } = useStore();

  useEffect(() => {
    monthStore.init();
    createdHabits.init();
    statisticsStore.loadStatistics();
    dayStore.generateDays();
    dayStore.checkPassedDays();
    setDays(dayStore.days);
  }, [dayStore, monthStore, statisticsStore, createdHabits]);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 pb-8">
      <ClearDataMotal />
      <h1
        id="top"
        className="font-sans italic tracking-widest text-indigo-700 font-normal underline text-9xl text-center mb-12"
      >
        {monthStore.currentMonth}
      </h1>
      <CalendarHeader days={days} />
      <div className="container w-full">
        <div className="flex relative flex-col bg-blue-300 shadow-inner bg-opacity-50 rounded-md p-2 p-8">
          <HideDaysButton hidden={hidden} setHidden={setHidden} />
          {days.map((day) =>
            hidden && day.passed ? null : (
              <DayCard key={day.id} day={day} habits={day.habits} />
            )
          )}
        </div>
        <Statistics />
      </div>
      <BackToTop />
    </div>
  );
}

export default observer(App);
