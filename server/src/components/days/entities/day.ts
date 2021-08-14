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

  @Column()
  @Field()
  passed: boolean;

  @OneToMany(() => Habit, (habit) => habit.day, {
    cascade: ['update'],
  })
  @Field(() => [Habit], { nullable: true })
  habits: Habit[];

  @ManyToOne(() => Month, (month) => month.days)
  @JoinColumn()
  @Field(() => Month)
  month: Month;
}
