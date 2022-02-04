import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty({
    description: '유저 아이디',
  })
  user_id: string;

  @ApiProperty({
    description: '등급',
  })
  user_grade: string;
}
