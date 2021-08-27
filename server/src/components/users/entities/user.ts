import { Field, ObjectType } from '@nestjs/graphql';
import { Habit } from 'src/components/habits/entities/habit';
import { Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Month } from '../../months/entities/Month';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Month, (month) => month.user)
  @Field(() => Month)
  month: Month;

  @OneToMany(() => Habit, (habit) => habit.user)
  habits: Habit[];
}
