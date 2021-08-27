import { IsNotEmpty, IsString } from 'class-validator';

export class NewHabitDto {
  @IsString()
  @IsNotEmpty()
  habitName: string;

  dayId: string;
}
