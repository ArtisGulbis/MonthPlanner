import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysModule } from '../days/days.module';
import { Day } from '../days/entities/day';
import { UsersModule } from '../users/users.module';
import { Habit } from './entities/habit';
import { HabitsResolver } from './habits.resolver';
import { HabitsService } from './habits.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habit, Day]),
    DaysModule,
    forwardRef(() => UsersModule),
  ],
  providers: [HabitsService, HabitsResolver],
  exports: [HabitsService],
})
export class HabitsModule {
  constructor() {}
}
