import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
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
      <Grid>
        <Grid.Row textAlign="center" className="bg-red-300">
          <button onClick={clearLocalStorage}>Clear</button>
        </Grid.Row>
        <Grid.Column
          width={14}
          className="bg-blue-300 flex"
          verticalAlign="middle"
        >
          <div className="flex flex-wrap">
            {days.map((day) => (
              <DayComponent key={day.id} day={day} habits={day.habits} />
            ))}
          </div>
        </Grid.Column>
        <Grid.Column width={2} className="bg-yellow-300">
          <StatisticsComponent />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default observer(App);
