import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from '../days/entities/day';
import { Habit } from '../habits/entities/habit';
import { NewHabitInput } from './dto/new-habit.input';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day) private daysRepository: Repository<Day>,
    @InjectRepository(Habit) private habitsRepository: Repository<Habit>,
  ) {}

  public async addHabitToDay(newHabitInput: NewHabitInput): Promise<Habit> {
    const { dayId, habitName } = newHabitInput;
    const day = await this.daysRepository.findOne(dayId, {
      relations: ['habits'],
    });
    const habit = this.habitsRepository.create({
      completed: false,
      habitName: habitName,
      missed: false,
    });
    habit.day = day;

    day.habits.push(habit);

    await this.habitsRepository.save(habit).catch((err) => {
      throw new InternalServerErrorException();
    });

    await this.daysRepository.save(day).catch((err) => {
      throw new InternalServerErrorException();
    });

    return habit;
  }

  public async getHabits(dayId: string): Promise<Day> {
    return await this.daysRepository
      .findOne(dayId, { relations: ['habits'] })
      .catch((err) => {
        throw new InternalServerErrorException();
      });
  }
}
