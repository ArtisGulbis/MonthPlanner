import { Module } from '@nestjs/common';
import { UserHabitsService } from './user-habits.service';
import { UserHabitsResolver } from './user-habits.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHabit } from './entities/userHabits';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserHabit]), UsersModule],
  providers: [UserHabitsResolver, UserHabitsService],
})
export class UserHabitsModule {}
