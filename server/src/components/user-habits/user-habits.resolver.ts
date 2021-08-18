import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ValidationError } from 'class-validator';
import { HabitsResponse } from '../Response';
import { UserHabit } from './entities/userHabits';
import { UserHabitsService } from './user-habits.service';

@Resolver()
export class UserHabitsResolver {
  constructor(private readonly userHabitsService: UserHabitsService) {}

  @Query((_) => [UserHabit])
  public async getUserHabits(
    @Args('userId') userId: string,
  ): Promise<UserHabit[]> {
    return await this.userHabitsService.findAll(userId);
  }

  @Mutation((_) => HabitsResponse)
  public async createUserHabit(
    @Args('username') username: string,
    @Args('habitName') habitName: string,
  ): Promise<HabitsResponse> {
    const res = await this.userHabitsService.createUserHabit(
      username,
      habitName,
    );
    return {
      data: res.data,
      errors: res.errors,
    };
  }

  @Mutation((_) => Boolean)
  public async deleteOneCreatedHabit(
    @Args('habitId') habitId: string,
  ): Promise<boolean> {
    return await this.userHabitsService.deleteOne(habitId);
  }
}
