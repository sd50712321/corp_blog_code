import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CampRegistList {
  @IsString()
  camp_name: string;

  @IsString()
  zip_code: string;

  @IsString()
  jibun_addr: string;

  @IsString()
  dets_addr: string;

  @IsString()
  intro: string;

  @IsString()
  mobile: string;
}

export class UserRegistIncludeCampDto {
  @IsString()
  user_id: string;

  @IsString()
  password: string;

  @IsString()
  user_name: string;

  @IsString()
  user_phone: string;

  @IsArray()
  camp_list: CampRegistList[];
}
