import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/components/users/entities/user';
import { IsAlpha, IsNotEmpty, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserHabit {
  @PrimaryGeneratedColumn('uuid')
  @Field({ nullable: true })
  id: string;

  @Column({ unique: true })
  @IsString({ message: 'Must only contain letters' })
  @IsNotEmpty()
  @Length(2, 20, { message: 'Must be between 2 and 20 characters' })
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.createdHabits)
  @Field(() => User, { nullable: true })
  user: User;
}
