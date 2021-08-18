import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DaysModule } from './days/days.module';
import { HabitsModule } from './habits/habits.module';
import { MonthsModule } from './months/months.module';
import { User } from './users/entities/user';
import { UsersModule } from './users/users.module';
import { UserHabitsModule } from './user-habits/user-habits.module';

@Module({
  imports: [MonthsModule, UsersModule, DaysModule, HabitsModule, AuthModule, UserHabitsModule],
})
export class ComponentsModule {}
