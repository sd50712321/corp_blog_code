import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { Camp } from 'src/camps/camps.entity';
import { CampsService } from 'src/camps/camps.service';
import { CampRegistDto } from 'src/camps/dto/camp_regist.dto';
import { Connection } from 'typeorm';
import { UserRegistDto } from './dto/user_regist.dto';
import { UserRegistIncludeCampDto } from './dto/user_regist_include_camp.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private campService: CampsService,
    private connection: Connection,
  ) {}
  private logger = new Logger('UsersController');

  @Post()
  async registUser(@Body() userRegistDto: UserRegistDto): Promise<void> {
    this.logger.log('userRegistDto', JSON.stringify(userRegistDto));
    const result = await this.userService.registUser(userRegistDto);
  }

  @Post('/multi')
  async registUserIncludeCamp(
    @Body() userRegistIncludeCampDto: UserRegistIncludeCampDto,
  ): Promise<void> {
    this.logger.log('userRegistDto', JSON.stringify(userRegistIncludeCampDto));
    const { camp_list, ...rest } = userRegistIncludeCampDto;
    const { user_id } = rest;
    const userRegistDto: UserRegistDto = {
      ...rest,
    };
    const userChk = await this.userService.getUserByUserId(user_id);
    if (userChk) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }

    // 트랜잭션 시작
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const registUserResult = await this.userService.registUserQueryRunner(
        userRegistDto,
        queryRunner,
      );
      const { user_idx } = registUserResult;
      // throw new InternalServerErrorException('에러발생');
      this.logger.log('registUserResult', JSON.stringify(registUserResult));
      const camps: Camp[] = camp_list.map((camp) => {
        return new Camp({
          ...camp,
          user: new User({
            user_idx,
          }),
        });
      });
      this.logger.log('camps', JSON.stringify(camps));
      const registCampResult = await this.campService.registCampMultiple(
        camps,
        queryRunner,
      );
      this.logger.log('registCampResult', JSON.stringify(registCampResult));
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
