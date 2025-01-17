import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Patient {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  lastname: string;

  @Prop({
    type: Date,
    required: true,
  })
  birhdate: Date;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: [Number],
    required: true,
  })
  phoneNumbers: number[];

  @Prop({
    type: [String],
    required: true,
  })
  emails: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
