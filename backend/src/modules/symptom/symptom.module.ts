import { Module } from '@nestjs/common';
import { SymptomService } from './services/symptom.service';
import { SymptomController } from './controllers/symptom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Symptom, SymptomSchema } from './schemas/symptom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Symptom.name, schema: SymptomSchema }]),
  ],
  providers: [SymptomService],
  controllers: [SymptomController],
})
export class SymptomModule {}
