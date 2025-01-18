import { Test, TestingModule } from '@nestjs/testing';
import { PatientSymptomController } from './patient-symptom.controller';

describe('PatientSymptomController', () => {
  let controller: PatientSymptomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientSymptomController],
    }).compile();

    controller = module.get<PatientSymptomController>(PatientSymptomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
