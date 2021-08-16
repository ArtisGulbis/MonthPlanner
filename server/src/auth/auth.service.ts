import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/components/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/components/users/entities/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const foundUser = await this.userService.findOne(user.username);
    if (foundUser) {
      const payload = {
        name: foundUser.username,
        sub: foundUser.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: 'SECRET',
    });

    const user = await this.userService.findOne(decoded.name);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
