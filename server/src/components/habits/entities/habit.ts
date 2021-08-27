import { Field, ObjectType } from '@nestjs/graphql';
import { Day } from 'src/components/days/entities/day';
import { User } from 'src/components/users/entities/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'habits' })
@ObjectType()
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  habitName: string;

  @Column()
  @Field()
  completed: boolean;

  @Column()
  @Field()
  missed: boolean;

  @ManyToOne(() => Day, (day) => day.habits)
  @JoinColumn()
  day: Day;

  @ManyToOne(() => User, (user) => user.habits)
  @JoinColumn()
  user: User;
}
