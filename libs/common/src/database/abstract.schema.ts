import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaType, SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocuments {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
