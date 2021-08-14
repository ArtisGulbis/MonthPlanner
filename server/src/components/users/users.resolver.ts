import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Month } from '../months/entities/Month';
import { RegisterInput } from './dto/register.input';
import { User } from './entities/user';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((_) => [User])
  public async getUsers(): Promise<User[]> {
    return this.usersService.findAll().catch((err) => {
      throw err;
    });
  }

  @Query((_) => User)
  public async getUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.findOne(id).catch((err) => {
      throw err;
    });
  }

  @Mutation((_) => User)
  public async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<User> {
    return await this.usersService.register(registerInput).catch((err) => {
      throw err;
    });
  }

  @Query((_) => Month)
  public async month(@Args('monthId') monthId: string): Promise<Month> {
    return await this.usersService.getMonth(monthId).catch((err) => {
      throw err;
    });
  }
}