import { Habit } from './habit';

export interface Day {
  id: string;
  dayNumber: number;
  weekday: string;
  habits?: Habit[];
  passed: boolean;
}
