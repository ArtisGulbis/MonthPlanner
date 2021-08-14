import { Module } from '@nestjs/common';
import { DaysModule } from './days/days.module';
import { HabitsModule } from './habits/habits.module';
import { MonthsModule } from './months/months.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MonthsModule, UsersModule, DaysModule, HabitsModule],
})
export class ComponentsModule {}
