import { Habit } from './habit';
import { HabitStats } from './habitStats';

export interface Statistics {
  habits: HabitStats[];
  // habits: Map<Habit, number>;
}
