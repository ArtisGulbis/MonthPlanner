import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DaysModule } from './days/days.module';
import { HabitsModule } from './habits/habits.module';
import { MonthsModule } from './months/months.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MonthsModule, UsersModule, DaysModule, HabitsModule, AuthModule],
})
export class ComponentsModule {}
