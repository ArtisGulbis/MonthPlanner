import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewMonthInput {
  @Field()
  name: string;
}
