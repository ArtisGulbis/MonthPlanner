import { Field, ObjectType } from '@nestjs/graphql';
import { UserHabit } from 'src/components/user-habits/entities/userHabits';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Month } from '../../months/entities/Month';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Month, (month) => month.user)
  @JoinColumn()
  @Field(() => Month)
  month: Month;

  @OneToMany(() => UserHabit, (userHabits) => userHabits.user)
  // @Field(() => [UserHabit], { nullable: true })
  createdHabits: UserHabit[];
}
