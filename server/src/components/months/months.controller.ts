import { Controller, UseGuards, Post, Req, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { GetCurrentUserById } from 'src/decorators/getCurrentUserById.decorator';
import { RegisterDto } from '../users/dto/register.dto';
import { UsersService } from '../users/users.service';
import { MonthsService } from './months.service';

@UseGuards(JwtAuthGuard)
@Controller('month')
export class MonthsController {
  constructor(private readonly monthsService: MonthsService) {}

  @Get()
  getUserMonth(@GetCurrentUserById() userId: number) {
    return this.monthsService.find(userId);
  }
}
