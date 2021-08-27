import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../days/entities/day';
import { Habit } from '../habits/entities/habit';
import { HabitsModule } from '../habits/habits.module';
import { Month } from '../months/entities/Month';
import { DaysResolver } from './days.resolver';
import { DaysService } from './days.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Day, Habit]),
    forwardRef(() => HabitsModule),
  ],
  providers: [DaysService, DaysResolver],
  exports: [DaysService],
})
export class DaysModule {
  constructor() {}
}
