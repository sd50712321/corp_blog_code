import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampsController } from './camps.controller';
import { CampsRepository } from './camps.repository';
import { CampsService } from './camps.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampsRepository])],
  exports: [CampsService],
  controllers: [CampsController],
  providers: [CampsService],
})
export class CampsModule {}
