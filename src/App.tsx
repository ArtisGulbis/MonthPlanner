import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import './App.css';
import DayComponent from './components/DayComponent';
import StatisticsComponent from './components/StatisticsComponent';
import { Day } from './models/day';
import { useStore } from './stores/store';
import { clearLocalStorage } from './utils/utils';

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
    <div>
      <div className="container">
        <button onClick={clearLocalStorage}>Clear</button>
      </div>
      <div className="container">
        <div className="child">
          {days.map((day) => (
            <DayComponent key={day.id} day={day} habits={day.habits} />
          ))}
        </div>
        <div>
          <StatisticsComponent />
        </div>
      </div>
    </div>
  );
}

export default observer(App);
