import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Month } from './entities/Month';
import { MonthsController } from './months.controller';
import { MonthsService } from './months.service';

@Module({
  imports: [TypeOrmModule.forFeature([Month])],
  providers: [MonthsService],
  exports: [MonthsService],
  controllers: [MonthsController],
})
export class MonthsModule {
  constructor() {}
}
