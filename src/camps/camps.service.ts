import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Camp } from './camps.entity';
import { CampsRepository } from './camps.repository';
import { CampRegistDto } from './dto/camp_regist.dto';
import { UpdateCampDto } from './dto/camp_update.dto';

@Injectable()
export class CampsService {
  constructor(private campRepository: CampsRepository) {}

  async registCamp(campRegistDto: CampRegistDto): Promise<Camp> {
    const result = await this.campRepository.createCamp(campRegistDto);
    return result;
  }

  async registCampMutlple(
    camps: Camp[],
    queryRunner: QueryRunner,
  ): Promise<Camp[]> {
    const result = await this.campRepository.createCampMutlple(
      camps,
      queryRunner,
    );
    return result;
  }
}
