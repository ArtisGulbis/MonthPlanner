import { Habit } from '../generated/graphql';
export interface HabitStats {
  habit: Habit;
  toDo: number;
  completed: number;
  missed: number;
}
