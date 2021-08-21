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
    const user = await this.userService.findOneByUsername(username);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Incorrect Credentials!');
  }

  async login(user: User) {
    const foundUser = await this.userService.findOneById(user.id);
    if (foundUser) {
      const payload = {
        name: foundUser.username,
        sub: foundUser.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
        monthId: foundUser.month.id,
        username: foundUser.username,
        id: foundUser.id,
      };
    }
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: 'SECRET',
    });

    const user = await this.userService.findOneById(decoded.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
