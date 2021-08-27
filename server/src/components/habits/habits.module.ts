import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysModule } from '../days/days.module';
import { Day } from '../days/entities/day';
import { UsersModule } from '../users/users.module';
import { Habit } from './entities/habit';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habit, Day]),
    forwardRef(() => DaysModule),
    forwardRef(() => UsersModule),
  ],
  providers: [HabitsService],
  exports: [HabitsService],
  controllers: [HabitsController],
})
export class HabitsModule {
  constructor() {}
}
