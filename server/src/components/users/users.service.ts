import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Month } from '../months/entities/Month';
import { RegisterInput } from './dto/register.input';
import { User } from './entities/user';
import { DateTime } from 'luxon';
import { Day } from '../days/entities/day';
import { MonthsService } from '../months/months.service';
import { hash } from 'bcrypt';

const now = DateTime.now();
const saltRounds = 10;
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

  public async findOne(username: string): Promise<User> | null {
    return await this.userRepository
      .findOneOrFail({
        where: { username },
        relations: ['month', 'month.days', 'month.days.habits'],
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  public async register(registerInput: RegisterInput): Promise<User> {
    const hashedPassword = await hash(registerInput.password, saltRounds);

    const user = this.userRepository.create({
      username: registerInput.username,
      password: hashedPassword,
    });

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

    for (let i = 0; i < DateTime.now().day - 1; i++) {
      const day = days[i];
      day.passed = true;
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

  public async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
