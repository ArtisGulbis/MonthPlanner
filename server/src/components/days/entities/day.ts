import { Field, ObjectType } from '@nestjs/graphql';
import { Habit } from 'src/components/habits/entities/habit';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Month } from '../../months/entities/Month';

@Entity({ name: 'days' })
@ObjectType()
export class Day {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  dayNumber: number;

  @Column()
  @Field()
  weekday: string;

  @Column({ type: 'bool', default: false })
  @Field(() => Boolean)
  passed: boolean;

  @OneToMany(() => Habit, (habit) => habit.day)
  @Field(() => [Habit], { nullable: true })
  habits: Habit[];

  @ManyToOne(() => Month, (month) => month.days)
  @JoinColumn()
  month: Month;
}
