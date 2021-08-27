import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetCurrentUserById } from 'src/decorators/getCurrentUserById.decorator';
import { NewHabitDto } from '../days/dto/NewHabitDto';
import { RemoveHabitDto } from './dtos/RemoveHabitDto';
import { UpdateHabitDto } from './dtos/UpdateHabitDto';
import { UpdateHabitTextDto } from './dtos/UpdateHabitTextDto';
import { HabitsService } from './habits.service';

@UseGuards(JwtAuthGuard)
@Controller('/habit')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post('/create')
  async create(@Body() body: NewHabitDto, @GetCurrentUserById() user: string) {
    return await this.habitsService.addHabit(body, user);
  }

  @Post('/delete')
  async delete(@Body() body: RemoveHabitDto) {
    return await this.habitsService.deleteHabit(body);
  }

  @Patch('/updateCompletion')
  async updateCompletion(@Body() body: UpdateHabitDto) {
    return await this.habitsService.updateHabitCompletion(body);
  }

  @Patch('/updateText')
  async updateText(
    @Body() body: UpdateHabitTextDto,
    @GetCurrentUserById() userId: string,
  ) {
    return await this.habitsService.editHabitName(body, userId);
  }

  @Patch('/deleteAll')
  async deleteAll(@GetCurrentUserById() userId: string) {
    return await this.habitsService.deleteAllHabits(userId);
  }
}
