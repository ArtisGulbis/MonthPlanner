import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../days/entities/day';
import { Habit } from '../habits/entities/habit';
import { HabitsModule } from '../habits/habits.module';
import { DaysController } from './days.controller';
import { DaysService } from './days.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Day, Habit]),
    forwardRef(() => HabitsModule),
  ],
  providers: [DaysService],
  exports: [DaysService],
  controllers: [DaysController],
})
export class DaysModule {
  constructor() {}
}
