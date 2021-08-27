import { Habit } from 'src/components/habits/entities/habit';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Month } from '../../months/entities/Month';

@Entity({ name: 'days' })
export class Day {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dayNumber: number;

  @Column()
  weekday: string;

  @Column({ type: 'bool', default: false })
  passed: boolean;

  @OneToMany(() => Habit, (habit) => habit.day, { eager: true })
  habits: Habit[];

  @ManyToOne(() => Month, (month) => month.days)
  @JoinColumn()
  month: Month;
}
