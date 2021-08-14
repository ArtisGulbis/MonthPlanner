import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Month } from '../months/entities/Month';
import { RegisterInput } from './dto/register.input';
import { User } from './entities/user';
import { DateTime } from 'luxon';
import { Day } from '../days/entities/day';
import { v4 as uuidv4 } from 'uuid';
import { MonthsService } from '../months/months.service';

const now = DateTime.now();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Month) private monthRepository: Repository<Month>,
    @InjectRepository(Day) private dayRepository: Repository<Day>,
    private monthService: MonthsService,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository
      .find({ relations: ['month', 'month.days', 'month.days.habits'] })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  public async findOne(id: string): Promise<User> {
    return await this.userRepository
      .findOne({ where: { id }, relations: ['month', 'month.days'] })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  public async register(registerInput: RegisterInput): Promise<User> {
    const user = this.userRepository.create(registerInput);
    const month = this.monthRepository.create({
      name: 'August',
    });

    let days: Day[] = [];
    for (let i = 1; i < now.daysInMonth; i++) {
      const day: Day = this.dayRepository.create({
        dayNumber: i,
        passed: false,
        weekday: now.startOf('month').plus({ days: i - 1 }).weekdayShort,
        habits: null,
      });
      day.month = month;
      days.push(day);
    }

    month.days = [...days];
    month.user = user;
    user.month = month;

    await this.monthRepository.save(month).catch((err) => {
      throw new InternalServerErrorException();
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Day)
      .values([...days])
      .execute();

    return await this.userRepository.save(user).catch((err) => {
      throw new InternalServerErrorException();
    });
  }

  public async getMonth(monthId: string): Promise<Month> {
    return await this.monthService.findOne(monthId);
  }
}
