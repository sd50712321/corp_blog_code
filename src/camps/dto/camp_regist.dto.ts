import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CampRegistDto {
  @IsNumber()
  @ApiProperty({
    description: '유저 인덱스',
    example: 1,
    required: true,
    type: 'number',
  })
  user_idx: number;

  @IsString()
  @ApiProperty({
    description: '캠핑장 이름',
    example: '캠핑장 이름1',
    required: true,
    type: 'string',
  })
  camp_name: string;

  @IsString()
  @ApiProperty({
    description: '우편번호',
    example: '12345',
    required: true,
    type: 'string',
  })
  zip_code: string;

  @IsString()
  @ApiProperty({
    description: '지번 주소',
    example: '경기도 용인시 기흥구',
    required: true,
    type: 'string',
  })
  jibun_addr: string;

  @IsString()
  @ApiProperty({
    description: '상세 주소',
    example: '흥덕마을 123456',
    required: true,
    type: 'string',
  })
  dets_addr: string;

  @IsString()
  @ApiProperty({
    description: '캠핑장 설명',
    example: '여기는 캠핑장입니다.',
    required: true,
    type: 'string',
  })
  intro: string;

  @IsString()
  @ApiProperty({
    description: '캠핑장 번호',
    example: '01099999999',
    required: true,
    type: 'string',
  })
  mobile: string;
}
