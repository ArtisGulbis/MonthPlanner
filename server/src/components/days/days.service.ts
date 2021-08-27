import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { now } from 'src/utils/utils';
import { getConnection, Repository } from 'typeorm';
import { Day } from '../days/entities/day';
import { Habit } from '../habits/entities/habit';
import { HabitsService } from '../habits/habits.service';
import { Month } from '../months/entities/Month';
import { NewHabitInput } from './dto/new-habit.input';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day) private daysRepository: Repository<Day>,
    // @InjectRepository(Habit) private habitsRepository: Repository<Habit>,
    @Inject(forwardRef(() => HabitsService))
    private habitsService: HabitsService,
  ) {}

  public async addHabitToDay(newHabitInput: NewHabitInput): Promise<Habit> {
    const { dayId, habitName } = newHabitInput;
    const day = await this.daysRepository.findOne(dayId, {
      relations: ['habits'],
    });
    const habit = this.habitsService.createHabit(habitName);
    habit.day = day;

    day.habits.push(habit);

    await this.habitsService.saveHabit(habit);
    await this.update(day);

    return habit;
  }

  public async findOne(dayId: string): Promise<Day> {
    return await this.daysRepository.findOneOrFail(dayId, {
      relations: ['habits'],
    });
  }

  public async insertDays(days: Day[]) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Day)
      .values([...days])
      .execute();
  }

  public async update(day: Day): Promise<Day> {
    return await this.daysRepository.save(day).catch((err) => {
      throw new InternalServerErrorException('Something went wrong');
    });
  }

  public async getHabits(dayId: string): Promise<Day> {
    return await this.daysRepository
      .findOne(dayId, { relations: ['habits'] })
      .catch((err) => {
        throw new InternalServerErrorException();
      });
  }

  public createDays(month: Month): Day[] {
    let days: Day[] = [];
    for (let i = 1; i < now.daysInMonth; i++) {
      const day: Day = this.daysRepository.create({
        dayNumber: i,
        passed: false,
        weekday: now.startOf('month').plus({ days: i - 1 }).weekdayShort,
        habits: null,
      });
      day.month = month;
      days.push(day);
    }

    this.setPassed(days);

    return days;
  }

  public setPassed(days: Day[]) {
    for (let i = 0; i < now.day - 1; i++) {
      days[i].passed = true;
    }
  }

  public async setDayPassed(dayIds: string[]): Promise<boolean> {
    const res = await getConnection()
      .createQueryBuilder()
      .update(Day)
      .set({ passed: true })
      .andWhereInIds(dayIds)
      .execute();

    if (res.affected > 0) {
      return true;
    }
    return false;
  }
}
