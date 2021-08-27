import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useStore } from '../stores/store';
import AddHabitForm from './AddHabitForm';
import BackToTop from './BackToTop';
import CalendarHeader from './CalendarHeader';
import CreatedHabitsContainer from './CreatedHabitsContainer';
import DayCard from './DayCard';
import GitHubIcon from './GitHubIcon';
import Header from './Header';
import HideDaysButton from './HideDaysButton';
import LoginHeader from './LoginHeader';
import Statistics from './Statistics';

const MainPage = () => {
  const {
    dayStore,
    userStore,
    monthStore,
    statisticsStore,
    createdHabitsStore,
  } = useStore();

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    monthStore.loadMonth();
  }, [dayStore, userStore, monthStore, statisticsStore, createdHabitsStore]);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <LoginHeader />
      <div className="pb-8">
        <GitHubIcon />
        <Header monthName={monthStore.currentMonth} />
        <CalendarHeader days={dayStore.days} />
        <div className="container w-full">
          <div className="flex relative flex-col bg-indigo-100 bg-opacity-50 w-full ms:w-auto shadow-inner  rounded-md p-1 md:p-8 small-screens">
            <HideDaysButton hidden={hidden} setHidden={setHidden} />
            <AddHabitForm />
            <CreatedHabitsContainer />
            {dayStore.days.map((day) =>
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
};

export default observer(MainPage);
