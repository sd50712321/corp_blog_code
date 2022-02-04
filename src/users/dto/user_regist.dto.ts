import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Matches } from 'class-validator';

export class UserRegistDto {
  @IsString()
  @ApiProperty({
    description: '유저 아이디',
    required: true,
    example: 'lsmTest',
  })
  user_id: string;

  @IsString()
  @ApiProperty({
    description: '유저 비밀번호',
    required: true,
    example: 'R!a12345',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        '8글자, 적어도 1개의 대문자, 적어도 1개의 소문자, 적어도 1개의 숫자, 적어도 1개의 특수문자가 필요합니다.',
    },
  )
  password: string;

  @IsString()
  user_name: string;

  @IsString()
  user_phone: string;
}
