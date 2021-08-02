import { Habit } from './habit';

export interface Day {
  id: string;
  dayNumber: number;
  weekDay: string;
  habits: Habit[];
  passed: boolean;
}
