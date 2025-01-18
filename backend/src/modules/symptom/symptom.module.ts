import { Module } from '@nestjs/common';
import { SymptomService } from './services/symptom.service';
import { SymptomController } from './controllers/symptom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Symptom, SymptomSchema } from './schemas/symptom.schema';
import { PatientSymptomModule } from '../patient-symptom/patient-symptom.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Symptom.name, schema: SymptomSchema }]),
    PatientSymptomModule,
  ],
  providers: [SymptomService],
  controllers: [SymptomController],
})
export class SymptomModule {}
