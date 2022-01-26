import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampsModule } from 'src/camps/camps.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), CampsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
