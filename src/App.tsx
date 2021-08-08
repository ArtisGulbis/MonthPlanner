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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreatedHabitsContainer from './components/CreatedHabitsContainer';
import { clearLocalStorage } from './utils/utils';

function App() {
  const [days, setDays] = useState<Day[]>([]);
  const [hidden, setHidden] = useState(true);
  const {
    dayStore,
    modalStore,
    monthStore,
    statisticsStore,
    createdHabitsStore,
  } = useStore();

  useEffect(() => {
    monthStore.init();
    createdHabitsStore.init();
    statisticsStore.loadStatistics();
    dayStore.generateDays();
    dayStore.checkPassedDays();
    setDays(dayStore.days);
  }, [dayStore, monthStore, statisticsStore, createdHabitsStore]);

  const onYes = () => {
    modalStore.closeModal();
    clearLocalStorage();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gradient-to-b from-blue-100 to-blue-200 pb-8">
        <ClearDataMotal onYes={onYes} text="Do you want to clear all data?" />
        <h1
          id="top"
          className="font-sans italic tracking-widest text-indigo-700 font-normal underline text-9xl text-center mb-12"
        >
          {monthStore.currentMonth}
        </h1>
        <CalendarHeader days={days} />
        <div className="container w-full">
          <div className="flex relative flex-col bg-blue-300 shadow-inner bg-opacity-50 rounded-md p-2 p-8">
            <CreatedHabitsContainer />
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
    </DndProvider>
  );
}

export default observer(App);
