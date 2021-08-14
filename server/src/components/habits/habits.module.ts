import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../days/entities/day';
import { Habit } from './entities/habit';
import { HabitsResolver } from './habits.resolver';
import { HabitsService } from './habits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, Day])],
  providers: [HabitsService, HabitsResolver],
  exports: [HabitsService],
})
export class HabitsModule {
  constructor() {}
}
