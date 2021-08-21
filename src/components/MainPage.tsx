import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import monthService from '../services/monthService/monthService';
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
import ModalContainer from './ModalContainer';
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
    if (userStore.userData?.monthId) {
      monthService.getMonth(userStore.userData.monthId).then(async (res) => {
        if (res) {
          dayStore.setData(res.getMonth.days);
          await dayStore.checkPassedDays();
          monthStore.setMonth(res.getMonth.name);
          res.getMonth.days.forEach((el) => {
            if (el.habits) {
              statisticsStore.createStatistics(el.habits);
            }
          });
        }
      });
    }
  }, [dayStore, userStore, monthStore, statisticsStore, createdHabitsStore]);

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <LoginHeader />
        <div className="bg-gradient-to-b from-blue-100 to-blue-200 pb-8">
          <ModalContainer />
          <GitHubIcon />
          <Header monthName={monthStore.currentMonth} />
          <CalendarHeader days={dayStore.days} />
          <div className="container w-full">
            <div className="flex relative flex-col bg-blue-300 w-full ms:w-auto shadow-inner bg-opacity-50 rounded-md p-1 md:p-8 small-screens">
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
    </>
  );
};

export default observer(MainPage);
