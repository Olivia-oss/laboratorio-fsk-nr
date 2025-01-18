import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MoogoseSchema } from 'mongoose';
import { Patient } from 'src/modules/patient/schemas/patient.schema';
import { Symptom } from 'src/modules/symptom/schemas/symptom.schema';
@Schema()
export class PatientSymptom {
  @Prop({
    type: MoogoseSchema.Types.ObjectId,
    required: true,
    ref: Patient.name,
  })
  idPatient: string;

  @Prop({
    type: MoogoseSchema.Types.ObjectId,
    required: true,
    ref: Symptom.name,
  })
  idSymptom: string;
}

export const PatientSymptomSchema =
  SchemaFactory.createForClass(PatientSymptom);
