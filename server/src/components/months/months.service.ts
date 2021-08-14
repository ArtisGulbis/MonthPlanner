import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Month } from './entities/Month';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewMonthInput } from './dto/new-month.input';

@Injectable()
export class MonthsService {
  constructor(
    @InjectRepository(Month) private monthRepository: Repository<Month>,
  ) {}

  public async findAll(): Promise<Month[]> {
    return await this.monthRepository.find({}).catch((err) => {
      throw new InternalServerErrorException();
    });
  }

  public async addMonth(newMonthData: NewMonthInput): Promise<Month | void> {
    const newMonth = this.monthRepository.create(newMonthData);
    return await this.monthRepository.save(newMonth).catch((err) => {
      new InternalServerErrorException();
    });
  }

  public async findOne(id: string): Promise<Month | null> {
    const month = await this.monthRepository.findOne({
      where: { id },
      relations: ['user', 'days', 'days.habits'],
    });
    month.days.sort((first, second) => first.dayNumber - second.dayNumber);
    if (month) {
      return month;
    }
    return null;
  }
}
