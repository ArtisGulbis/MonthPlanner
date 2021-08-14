import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Habit } from '../habits/entities/habit';
import { DaysService } from './days.service';
import { NewHabitInput } from './dto/new-habit.input';
import { Day } from './entities/day';

@Resolver()
export class DaysResolver {
  constructor(private daysService: DaysService) {}

  @Query((_) => Day)
  public async getDay(@Args('dayId') dayId: string): Promise<Day> {
    return await this.daysService.getHabits(dayId).catch((err) => {
      throw err;
    });
  }
}
