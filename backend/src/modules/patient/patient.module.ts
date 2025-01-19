import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { PatientSymptomModule } from '../patient-symptom/patient-symptom.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    PatientSymptomModule,
  ],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
