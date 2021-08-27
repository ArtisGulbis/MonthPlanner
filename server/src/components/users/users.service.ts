import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Month } from '../months/entities/Month';
import { RegisterInput } from './dto/register.input';
import { User } from './entities/user';
import { Day } from '../days/entities/day';
import { MonthsService } from '../months/months.service';
import { hash } from 'bcrypt';
import { Habit } from '../habits/entities/habit';
import { HabitsService } from '../habits/habits.service';
import { JwtResponse } from '../jwtResponse';
import { AuthService } from 'src/auth/auth.service';
import { validate, ValidationError } from 'class-validator';
import { saltRounds } from 'src/utils/utils';
import { DaysService } from '../days/days.service';

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
    private daysService: DaysService,
  ) {}

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

    const month = this.monthsService.createMonth();
    let days: Day[] = this.daysService.createDays(month);

    month.days = [...days];
    month.user = user;
    user.month = month;

    await this.monthsService.saveMonth(month);
    await this.daysService.insertDays(days);

    const errors = await this.validateUser(user);

    if (errors.length > 0) {
      errors.forEach((err) => {
        switch (err.property) {
          case 'password':
            throw new Error('Bad password');
          default:
            throw new InternalServerErrorException();
        }
      });
    }

    user.password = hashedPassword;

    await this.saveUser(user);

    return await this.authService.login(user);
  }

  public async validateUser(user: User): Promise<ValidationError[]> {
    return await validate(user);
  }

  public async getMonth(monthId: string): Promise<Month> {
    return await this.monthsService.findOne(monthId);
  }

  public async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user).catch((err) => {
      throw new InternalServerErrorException('User already exists');
    });
  }
}
