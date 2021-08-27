import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Month } from './entities/Month';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewMonthInput } from './dto/new-month.input';
import { DateTime } from 'luxon';

@Injectable()
export class MonthsService {
  constructor(
    @InjectRepository(Month) private monthRepository: Repository<Month>,
  ) {}

  public async addMonth(newMonthData: NewMonthInput): Promise<Month | void> {
    const newMonth = this.monthRepository.create(newMonthData);
    return await this.monthRepository.save(newMonth).catch((err) => {
      new InternalServerErrorException();
    });
  }

  public async saveMonth(month: Month) {
    await this.monthRepository.save(month);
  }

  public createMonth = (): Month => {
    const month = this.monthRepository.create({
      name: DateTime.now().monthLong,
    });
    return month;
  };

  public async find(userId: number): Promise<Month | null> {
    const month = await this.monthRepository.findOne({
      where: { user: userId },
      relations: ['days', 'days.habits'],
    });
    month.days.sort((first, second) => first.dayNumber - second.dayNumber);
    if (month) {
      return month;
    }
    return null;
  }
}
