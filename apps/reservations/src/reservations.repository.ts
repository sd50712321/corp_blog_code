import { AbstractDocuments } from '@app/common/database/abstract.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationDocument } from './models/reservation.schema';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/common';

@Injectable()
export class ReservastionRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservastionRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
