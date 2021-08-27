import { IsAlpha, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsAlpha()
  username: string;
  @IsString()
  @Length(6, 32, {
    message: 'Password must be between $constraint1 and $constraint2 long.',
  })
  password: string;
}
