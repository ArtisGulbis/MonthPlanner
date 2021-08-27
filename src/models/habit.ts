export interface Habit {
  id: string;
  dayId: string;
  userId: string;
  habitName: string;
  completed: boolean;
  missed: boolean;
}
