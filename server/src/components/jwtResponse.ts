import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtResponse {
  @Field()
  access_token: string;
  @Field()
  monthId: string;
  @Field()
  username: string;
  @Field()
  id: string;
}
