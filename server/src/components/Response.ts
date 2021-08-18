import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';
import { ValidationError } from 'class-validator';
import { UserHabit } from './user-habits/entities/userHabits';

@ObjectType()
export class HabitsResponse {
  @Field(() => UserHabit || [UserHabit], { nullable: true })
  data: UserHabit | UserHabit[];
  @Field(() => [String], { nullable: true })
  errors: {
    [type: string]: string;
  }[];
}
