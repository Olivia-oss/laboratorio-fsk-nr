import { Module } from '@nestjs/common';
import { PatientSymptomService } from './services/patient-symptom.service';
import { PatientSymptomController } from './controllers/patient-symptom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PatientSymptom,
  PatientSymptomSchema,
} from './schemas/patient-symptom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PatientSymptom.name, schema: PatientSymptomSchema },
    ]),
  ],
  providers: [PatientSymptomService],
  controllers: [PatientSymptomController],
  exports: [PatientSymptomService],
})
export class PatientSymptomModule {}
