import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, ValidationError } from 'class-validator';
import { getConnection, Repository } from 'typeorm';
import { HabitsResponse } from '../Response';
import { UsersService } from '../users/users.service';
import { UserHabit } from './entities/userHabits';

@Injectable()
export class UserHabitsService {
  constructor(
    @InjectRepository(UserHabit)
    private userHabitRepository: Repository<UserHabit>,
    private userService: UsersService,
  ) {}

  public async findAll(userId: string): Promise<UserHabit[]> {
    return await this.userHabitRepository.find({ userId });
  }

  public async findOne(userId: string): Promise<UserHabit> {
    return await this.userHabitRepository.findOneOrFail({ userId });
  }

  public async deleteOne(habitId: string): Promise<boolean> {
    const res = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UserHabit)
      .where('id = :id', { id: habitId })
      .execute();
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  public async createUserHabit(
    username: string,
    habitName: string,
  ): Promise<HabitsResponse> {
    let response: HabitsResponse = {
      data: null,
      errors: [],
    };
    const user = await this.userService.findOne(username);

    const userHabit = this.userHabitRepository.create({
      name: habitName,
      user,
    });

    const errors = await validate(userHabit);
    if (errors.length > 0) {
      errors.forEach((el) => {
        console.log(el);
        response.errors.push(el.constraints);
      });
      return response;
    }

    const saved = await this.userHabitRepository.save(userHabit);
    response.data = saved;
    return response;
  }
}
