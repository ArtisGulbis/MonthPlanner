import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysModule } from '../days/days.module';
import { DaysService } from '../days/days.service';
import { Day } from '../days/entities/day';
import { Habit } from './entities/habit';
import { HabitsResolver } from './habits.resolver';
import { HabitsService } from './habits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, Day]), DaysModule],
  providers: [HabitsService, HabitsResolver],
  exports: [HabitsService],
})
export class HabitsModule {
  constructor() {}
}
