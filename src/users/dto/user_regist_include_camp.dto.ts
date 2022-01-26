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
  camp_name: string;
  zip_code: string;
  jibun_addr: string;
  dets_addr: string;
  intro: string;
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
