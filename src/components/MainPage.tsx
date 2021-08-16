import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Day } from '../models/day';
import { useStore } from '../stores/store';
import AddHabitForm from './AddHabitForm';
import BackToTop from './BackToTop';
import CalendarHeader from './CalendarHeader';
import CreatedHabitsContainer from './CreatedHabitsContainer';
import DayCard from './DayCard';
import GitHubIcon from './GitHubIcon';
import Header from './Header';
import HideDaysButton from './HideDaysButton';
import ModalContainer from './ModalContainer';
import Statistics from './Statistics';

const MainPage = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [hidden, setHidden] = useState(true);

  const { dayStore, monthStore, statisticsStore, createdHabitsStore } =
    useStore();

  useEffect(() => {
    monthStore.init();
    createdHabitsStore.init();
    statisticsStore.loadStatistics();
    dayStore.generateDays();
    dayStore.checkPassedDays();
    setDays(dayStore.days);
  }, [dayStore, monthStore, statisticsStore, createdHabitsStore]);

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <div className="bg-gradient-to-b from-blue-100 to-blue-200 pb-8">
          <GitHubIcon />
          <ModalContainer />
          <Header />
          <CalendarHeader days={days} />
          <div className="container w-full">
            <div className="flex relative flex-col bg-blue-300 w-full ms:w-auto shadow-inner bg-opacity-50 rounded-md p-1 md:p-8 small-screens">
              <HideDaysButton hidden={hidden} setHidden={setHidden} />
              <AddHabitForm />
              <CreatedHabitsContainer />
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
    </>
  );
};

export default MainPage;
