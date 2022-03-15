import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Token } from 'src/auth/jwt-decorator';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CommonResponseVoid } from 'src/common/common.response';
import { Camp } from './camps.entity';
import { CampsService } from './camps.service';
import { CampRegistDto } from './dto/camp_regist.dto';

@Controller('camps')
@ApiTags('캠핑장')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(Role.user, Role.admin)
export class CampsController {
  constructor(private campService: CampsService) {}

  @Post()
  @ApiOperation({
    summary: '캠핑장 등록',
    description: '캠핑장을 등록합니다',
  })
  @ApiOkResponse({
    type: CommonResponseVoid,
  })
  async registerCamp(
    @Body() CampRegistDto: CampRegistDto,
    @Token() token?: JwtPayload,
  ): Promise<Camp> {
    console.log('token', token)
    return this.campService.registCamp(CampRegistDto);
  }
}
