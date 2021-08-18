import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DaysModule } from '../days/days.module';
import { Day } from '../days/entities/day';
import { HabitsModule } from '../habits/habits.module';
import { Month } from '../months/entities/Month';
import { MonthsModule } from '../months/months.module';
import { User } from './entities/user';
import { UserController } from './user.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Month, Day]),
    MonthsModule,
    DaysModule,
    forwardRef(() => AuthModule),
    HabitsModule,
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {
  constructor() {}
}
