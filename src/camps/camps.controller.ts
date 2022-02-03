import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CommonResponseVoid } from 'src/common/common.response';
import { Camp } from './camps.entity';
import { CampsService } from './camps.service';
import { CampRegistDto } from './dto/camp_regist.dto';
import { UpdateCampDto } from './dto/camp_update.dto';

@Controller('camps')
@ApiTags('캠핑장')
export class CampsController {
  constructor(private campService: CampsService) {}

  @Post()
  @ApiOperation({
    summary: '캠핑장 등록',
    description: '캠핑장을 등록합니다',
  })
  @ApiTags('캠핑장3', '캠핑장정보')
  @ApiOkResponse({
    type: CommonResponseVoid,
  })
  async registerCamp(@Body() CampRegistDto: CampRegistDto): Promise<Camp> {
    return this.campService.registCamp(CampRegistDto);
  }
}
