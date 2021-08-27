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
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  habitName: string;

  @Column()
  completed: boolean;

  @Column()
  missed: boolean;

  @ManyToOne(() => Day, (day) => day.habits)
  @JoinColumn()
  day: Day;

  @ManyToOne(() => User, (user) => user.habits)
  @JoinColumn()
  user: User;
}
