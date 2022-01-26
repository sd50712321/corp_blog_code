import { IsNumber, IsString } from 'class-validator';

export class CampRegistDto {
  @IsString()
  user_idx: number;

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
