import { UseGuards, Controller, Get, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetCurrentUserById } from 'src/decorators/getCurrentUserById.decorator';
import { DaysService } from './days.service';
import { NewHabitDto } from './dto/NewHabitDto';

@UseGuards(JwtAuthGuard)
@Controller('/days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}
}
