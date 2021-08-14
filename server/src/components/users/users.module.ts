import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../days/entities/day';
import { Month } from '../months/entities/Month';
import { MonthsModule } from '../months/months.module';
import { User } from './entities/user';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Month, Day]), MonthsModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {
  constructor() {}
}
