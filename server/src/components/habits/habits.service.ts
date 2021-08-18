import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { DaysService } from '../days/days.service';
import { NewHabitInput } from '../days/dto/new-habit.input';
import { Day } from '../days/entities/day';
import { Habit } from '../habits/entities/habit';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit) private habitsRepository: Repository<Habit>,
    private dayService: DaysService,
  ) {}

  public async addHabit(newHabitInput: NewHabitInput): Promise<Habit> {
    const { dayId, habitName } = newHabitInput;
    const day = await this.dayService.findOne(dayId);

    const habit = this.habitsRepository.create({
      completed: false,
      habitName: habitName,
      missed: false,
      day,
    });

    day.habits.push(habit);

    await this.habitsRepository.save(habit);
    await this.dayService.update(day);

    return habit;
  }

  public async getHabits(userId: string): Promise<Habit[]> {
    const res = await getConnection()
      .getRepository(Habit)
      .createQueryBuilder('habits')
      .select('name')
      .where('userId = :userId', { userId })
      .getMany();
    console.log(res);
    return res;
  }

  public async deleteHabit(habitId: string): Promise<Habit | null> {
    const habit = await this.habitsRepository.findOne(habitId);

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Habit)
      .where('id = :id', { id: habitId })
      .execute();

    return habit;
  }

  public async editHabitText(
    habitId: string,
    newText: string,
  ): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Habit)
      .set({ habitName: newText })
      .where('id = :id', { id: habitId })
      .execute();

    if (result.affected) {
      return true;
    }
    return false;
  }

  public async updateHabitCompletion(
    habitId: string,
    value: boolean,
  ): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Habit)
      .set({ completed: value })
      .where('id = :id', { id: habitId })
      .execute();
    if (result.affected) {
      return true;
    }
    return false;
  }

  public async updateHabitMissed(
    habitId: string,
    value: boolean,
  ): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Habit)
      .set({ missed: value })
      .where('id = :id', { id: habitId })
      .execute();
    if (result.affected) {
      return true;
    }
    return false;
  }
}
