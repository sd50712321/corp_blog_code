import { Camp } from './camps.entity';
import { Repository, EntityRepository, QueryRunner } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CampRegistDto } from './dto/camp_regist.dto';

@EntityRepository(Camp)
export class CampsRepository extends Repository<Camp> {
  private logger = new Logger('CampsRepository', { timestamp: true });

  async createCamp(createCampDto: CampRegistDto): Promise<Camp> {
    const camp = this.create({
      ...createCampDto,
    });
    this.logger.log('camp', camp);

    await this.save(camp);
    return camp;
  }

  async createCampMutlple(
    camps: Camp[],
    queryRunner: QueryRunner,
  ): Promise<Camp[]> {
    this.logger.log('createCampDto', JSON.stringify(camps));
    const result = await queryRunner.manager.save(Camp, camps);
    return result;
  }

  async getCamp(camp: Camp): Promise<Camp[]> {
    const { camp_idx, camp_name, first_create_dt, last_update_dt } = camp;

    const query = this.createQueryBuilder('camp');

    if (camp_idx) {
      query.andWhere('camp.camp_idx = :camp_idx', { camp_idx });
    }
    if (camp_name) {
      query.andWhere("camp.camp_name LIKE ':camp_name'", {
        camp_name: '%' + camp_name + '%',
      });
    }

    const result = await query.getMany();
    return result;
  }
}
