import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthSignInDto {
  @ApiProperty({
    description: '유저 아이디',
    required: true,
    example: 'lsmTest',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: '유저 비밀번호',
    required: true,
    example: '123123',
  })
  @IsString()
  // @MinLength(8)
  // @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}
