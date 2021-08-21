import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Month } from '../months/entities/Month';
import { RegisterInput } from './dto/register.input';
import { User } from './entities/user';
import { DateTime } from 'luxon';
import { Day } from '../days/entities/day';
import { MonthsService } from '../months/months.service';
import { hash } from 'bcrypt';
import { Habit } from '../habits/entities/habit';
import { HabitsService } from '../habits/habits.service';
import { JwtResponse } from '../jwtResponse';
import { AuthService } from 'src/auth/auth.service';
import { validate } from 'class-validator';

const now = DateTime.now();
const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Month) private monthRepository: Repository<Month>,
    @InjectRepository(Day) private dayRepository: Repository<Day>,
    private monthsService: MonthsService,
    @Inject(forwardRef(() => HabitsService))
    private habitsService: HabitsService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository
      .find({ relations: ['month', 'month.days', 'month.days.habits'] })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  public async findOneByUsername(username: string): Promise<User> | null {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { username },
        relations: ['month', 'month.days', 'month.days.habits'],
      });
      if (!user) {
        throw new InternalServerErrorException("Can't find user");
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException("Cant' find user!");
    }
  }

  public async findOneById(id: string): Promise<User> | null {
    return await this.userRepository
      .findOneOrFail({
        where: { id },
        relations: ['month', 'month.days', 'month.days.habits'],
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  public async getUserHabits(userId: string): Promise<Habit[]> {
    return await this.habitsService.getHabits(userId);
  }

  public async register(registerInput: RegisterInput): Promise<JwtResponse> {
    const hashedPassword = await hash(registerInput.password, saltRounds);

    const user = this.userRepository.create({
      username: registerInput.username,
      password: registerInput.password,
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

    const errors = await validate(user);
    if (errors.length > 0) {
      errors.forEach((err) => {
        switch (err.property) {
          case 'password':
            throw new Error('bad password');
          default:
            throw new InternalServerErrorException();
        }
      });
    }
    user.password = hashedPassword;

    await this.userRepository.save(user).catch((err) => {
      throw new InternalServerErrorException('User already exists');
    });

    return await this.authService.login(user);
  }

  public async getMonth(monthId: string): Promise<Month> {
    return await this.monthsService.findOne(monthId);
  }

  public async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
