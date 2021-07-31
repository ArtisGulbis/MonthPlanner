import { Habit } from './habit';

export interface Day {
  id: string;
  dayNumber: number;
  habits: Habit[];
  passed: boolean;
}
