import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './App.css';
import BackToTopComponent from './components/BackToTopComponent';
import CalendarHeaderComponent from './components/CalendarHeaderComponent';
import DayComponent from './components/DayComponent';
import StatisticsComponent from './components/StatisticsComponent';
import { Day } from './models/day';
import { useStore } from './stores/store';
import { clearLocalStorage } from './utils/utils';

function App() {
  const [days, setDays] = useState<Day[]>([]);
  const { habitStore, monthStore, statisticsStore, createdHabits, modalStore } =
    useStore();

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
      <Modal
        size="mini"
        open={modalStore.open}
        onClose={() => modalStore.closeModal()}
      >
        <Modal.Header>
          <p>Do you want to clear all data?</p>
        </Modal.Header>
        <Modal.Actions>
          <Button
            color="red"
            inverted
            onClick={() => {
              modalStore.closeModal();
              clearLocalStorage();
            }}
          >
            Yes
          </Button>
          <Button color="blue" inverted onClick={() => modalStore.closeModal()}>
            No
          </Button>
        </Modal.Actions>
      </Modal>
      <h1
        id="top"
        className="italic tracking-widest text-indigo-700 font-bold text-9xl text-center mb-8"
      >
        {monthStore.currentMonth}
      </h1>
      <CalendarHeaderComponent days={days} />
      <div className="container w-11/12 m-auto">
        <div className="flex flex-col bg-blue-300 shadow-inner bg-opacity-50 rounded-md p-2 2xl:p-8">
          {days.map((day) => (
            <DayComponent key={day.id} day={day} habits={day.habits} />
          ))}
        </div>
        <StatisticsComponent />
      </div>
      <BackToTopComponent />
    </div>
  );
}

export default observer(App);
