import { User } from './users.entity';
import { Repository, EntityRepository, QueryRunner } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UserRegistDto } from './dto/user_regist.dto';
// import { CampRegistDto } from './dto/camp_regist.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository', { timestamp: true });

  async createUser(userRegistDto: UserRegistDto): Promise<User> {
    const uesr = this.create({
      ...userRegistDto,
    });
    this.logger.log('uesr', uesr);
    await this.save(uesr);
    return uesr;
  }

  async createUserQueryRunner(
    userRegistDto: UserRegistDto,
    queryRunner: QueryRunner,
  ): Promise<User> {
    const uesr = await queryRunner.manager.save(User, userRegistDto);
    return uesr;
  }

  async getUser(user: User): Promise<User[]> {
    const { user_idx, user_name, first_create_dt, last_update_dt } = user;

    const query = this.createQueryBuilder('user');

    if (user_idx) {
      query.andWhere('user.user_idx = :user_idx', { user_idx });
    }
    if (user_name) {
      query.andWhere("user.user_name LIKE '%:user_name%'", { user_name });
    }
    if (first_create_dt && last_update_dt) {
      query.andWhere(
        'user.first_create_dt BETWEEN :first_create_dt AND :last_update_dt',
        {
          first_create_dt,
          last_update_dt,
        },
      );
    }
    const result = await query.getMany();
    return result;
  }

  async getUserByUserId(user_id: string): Promise<User> {
    const query = this.createQueryBuilder('user');
    query.andWhere('user.user_id = :user_id', { user_id });
    this.logger.log('query', query.getQuery());
    try {
      const result = await query.getRawOne();
      this.logger.log('result', result);
      return result;
    } catch (err) {
      this.logger.log('err', err);
    }
  }
}
