import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { DaysService } from '../days/days.service';
import { NewHabitDto } from '../days/dto/NewHabitDto';
import { Day } from '../days/entities/day';
import { Habit } from '../habits/entities/habit';
import { UsersService } from '../users/users.service';
import { HabitDto } from './dtos/HabitDto';
import { RemoveHabitDto } from './dtos/RemoveHabitDto';
import { UpdateHabitDto } from './dtos/UpdateHabitDto';
import { UpdateHabitTextDto } from './dtos/UpdateHabitTextDto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit) private habitsRepository: Repository<Habit>,
    private daysService: DaysService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  public createHabit(habitName: string): Habit {
    return this.habitsRepository.create({
      completed: false,
      habitName,
      missed: false,
    });
  }

  public async addHabit(
    newHabitInput: NewHabitDto,
    userId: string,
  ): Promise<HabitDto> {
    const { dayId, habitName } = newHabitInput;
    const day = await this.daysService.findOne(dayId);
    const user = await this.usersService.findOneById(userId);

    const habit = this.habitsRepository.create({
      completed: false,
      habitName: habitName,
      missed: false,
      user,
      day,
    });

    day.habits.push(habit);

    await this.habitsRepository.save(habit);
    await this.daysService.update(day);

    return {
      completed: habit.completed,
      id: habit.id,
      habitName: habit.habitName,
      missed: habit.missed,
    };
  }

  public async getHabits(userId: string): Promise<Habit[]> {
    return await getConnection()
      .getRepository(Habit)
      .createQueryBuilder()
      .select('DISTINCT habitName')
      .where('userId = :userId', { userId })
      .getRawMany();
  }

  public async deleteHabit(
    removeHabitDto: RemoveHabitDto,
  ): Promise<Habit | null> {
    const habit = await this.habitsRepository.findOne({
      where: { id: removeHabitDto.id },
    });

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Habit)
      .where('id = :id', { id: removeHabitDto.id })
      .execute();

    return habit;
  }

  public async editHabitName(
    updateHabitTextDto: UpdateHabitTextDto,
    userId: string,
  ): Promise<boolean> {
    const { name, newName } = updateHabitTextDto;
    const result = await getConnection()
      .createQueryBuilder()
      .update(Habit)
      .set({ habitName: newName })
      .where('habitName = :habitName AND userId = :userId', {
        habitName: name,
        userId,
      })
      .execute();

    if (result.affected) {
      return true;
    }
    return false;
  }

  public async updateHabitCompletion(
    updateHabitDto: UpdateHabitDto,
  ): Promise<boolean> {
    const { id, value } = updateHabitDto;
    const result = await getConnection()
      .createQueryBuilder()
      .update(Habit)
      .set({ completed: value as boolean })
      .where('id = :id', { id })
      .execute();
    if (result.affected) {
      return true;
    }
    return false;
  }

  public async updateHabitMissed(habitIds: string[]): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Habit)
      .set({ missed: true })
      .andWhereInIds(habitIds)
      .execute();
    if (result.affected) {
      return true;
    }
    return false;
  }

  public async deleteHabitsByName(
    habitName: string,
    userId: string,
  ): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Habit)
      .where('userId = :userId AND habitName = :habitName', {
        userId,
        habitName,
      })
      .execute();
    if (result.affected > 0) {
      return true;
    }
    return false;
  }

  public async deleteAllHabits(userId: string): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Habit)
      .where('userId = :userId', {
        userId,
      })
      .execute();
    if (result.affected > 0) {
      return true;
    }
    return false;
  }

  public async saveHabit(habit: Habit) {
    await this.habitsRepository.save(habit).catch((err) => {
      throw new InternalServerErrorException('Something went wrong');
    });
  }
}
