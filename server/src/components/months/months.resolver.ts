import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewMonthInput } from './dto/new-month.input';
import { Month } from './entities/Month';
import { MonthsService } from './months.service';

@Resolver()
export class MonthsResolver {
  constructor(private monthsService: MonthsService) {}

  @Query((returns) => [Month])
  public async getMonths(): Promise<Month[]> {
    return this.monthsService.findAll().catch((err) => {
      throw err;
    });
  }

  @Query((returns) => Month)
  @UseGuards(JwtAuthGuard)
  public async getMonth(@Args('id') id: string): Promise<Month> {
    return this.monthsService.findOne(id).catch((err) => {
      throw err;
    });
  }

  @Mutation((returns) => Month)
  public async addNewMonth(
    @Args('newMonthData') newMonthData: NewMonthInput,
  ): Promise<Month | void> {
    return await this.monthsService.addMonth(newMonthData).catch((err) => {
      throw err;
    });
  }
}
