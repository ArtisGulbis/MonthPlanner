import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewHabitInput } from '../days/dto/new-habit.input';
import { Habit } from './entities/habit';
import { HabitsService } from './habits.service';

@Resolver()
export class HabitsResolver {
  constructor(private habitsService: HabitsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Habit)
  public async addHabit(
    @Args('newHabitInput') newHabitInput: NewHabitInput,
  ): Promise<Habit> {
    return await this.habitsService.addHabit(newHabitInput).catch((err) => {
      throw err;
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Habit)
  public async deleteHabit(@Args('habitId') habitId: string): Promise<Habit> {
    return await this.habitsService.deleteHabit(habitId).catch((err) => {
      throw err;
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  public async deleteHabitsByName(
    @Args('habitName') habitId: string,
    @Args('userId') userId: string,
  ): Promise<boolean> {
    return await this.habitsService
      .deleteHabitsByName(habitId, userId)
      .catch((err) => {
        throw err;
      });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  public async deleteAllHabits(
    @Args('userId') userId: string,
  ): Promise<boolean> {
    return await this.habitsService.deleteAllHabits(userId).catch((err) => {
      throw err;
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  public async editHabitText(
    @Args('habitName') habitId: string,
    @Args('userId') userId: string,
    @Args('newText') newText: string,
  ): Promise<boolean> {
    return await this.habitsService
      .editHabitName(habitId, userId, newText)
      .catch((err) => {
        throw err;
      });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  public async updateHabitCompletion(
    @Args('habitId') habitId: string,
    @Args('value') value: boolean,
  ): Promise<boolean> {
    return await this.habitsService
      .updateHabitCompletion(habitId, value)
      .catch((err) => {
        throw err;
      });
  }

  @Mutation((_) => Boolean)
  public async updateHabitMissed(
    @Args('habitIds', { type: () => [String] }) habitIds: string[],
  ): Promise<boolean> {
    return await this.habitsService.updateHabitMissed(habitIds).catch((err) => {
      throw err;
    });
  }
}
