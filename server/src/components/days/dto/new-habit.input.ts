import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewHabitInput {
  @Field()
  habitName: string;

  @Field()
  dayId: string;
}
