import { Module } from '@nestjs/common';
import { MonthsResolver } from './months.resolver';
import { MonthsService } from './months.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Month } from './entities/Month';
import { Habit } from '../habits/entities/habit';

@Module({
  imports: [TypeOrmModule.forFeature([Month])],
  providers: [MonthsService, MonthsResolver],
  exports: [MonthsService],
})
export class MonthsModule {
  constructor() {}
}
