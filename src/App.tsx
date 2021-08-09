import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import './App.css';
import AddHabitForm from './components/AddHabitForm';
import BackToTop from './components/BackToTop';
import CalendarHeader from './components/CalendarHeader';
import CreatedHabitsContainer from './components/CreatedHabitsContainer';
import DayCard from './components/DayCard';
import HideDaysButton from './components/HideDaysButton';
import Modal from './components/Modal';
import Statistics from './components/Statistics';
import { Day } from './models/day';
import { useStore } from './stores/store';
import { clearLocalStorage } from './utils/utils';
import { isMobile } from 'react-device-detect';

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

  const onYesClearData = () => {
    modalStore.closeModal();
    clearLocalStorage();
  };

  const handleClick = (habit: string) => {
    dayStore.clearDaysOfHabit(habit);
    statisticsStore.removeHabit(habit);
    createdHabitsStore.removeHabit(habit);
    createdHabitsStore.closeModal();
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="bg-gradient-to-b from-blue-100 to-blue-200 pb-8">
        <Modal
          onYes={onYesClearData}
          text="Do you want to clear all data?"
          onNo={() => modalStore.closeModal()}
          onClose={() => modalStore.closeModal()}
          open={modalStore.open}
        />
        <Modal
          open={createdHabitsStore.open}
          text={`Clear all instances of ${createdHabitsStore.currentlySelectedHabit}`}
          onYes={() => handleClick(createdHabitsStore.currentlySelectedHabit)}
          onClose={() => createdHabitsStore.closeModal()}
          onNo={() => createdHabitsStore.closeModal()}
        />
        <h1
          id="top"
          className="font-sans italic tracking-widest text-indigo-700 font-normal underline text-7xl pt-10 text-center md:mb-10 md:pt-10 md:text-9xl"
        >
          {monthStore.currentMonth}
        </h1>
        <CalendarHeader days={days} />
        <div className="container w-full">
          <div className="flex relative flex-col bg-blue-300 w-full ms:w-auto shadow-inner bg-opacity-50 rounded-md p-1 md:p-8 small-screens">
            <AddHabitForm />
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
