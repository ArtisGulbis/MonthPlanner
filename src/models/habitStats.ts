import { Habit } from './habit';

export interface HabitStats {
  habit: Habit;
  toDo: number;
  completed: number;
}
