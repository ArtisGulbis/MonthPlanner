import { Field, ObjectType } from '@nestjs/graphql';
import { Day } from 'src/components/days/entities/day';
import { User } from 'src/components/users/entities/user';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Month {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToOne(() => User, (user) => user.month, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @OneToMany(() => Day, (day) => day.month)
  @Field(() => [Day])
  days: Day[];
}
