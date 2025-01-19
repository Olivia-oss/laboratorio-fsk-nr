import { Test, TestingModule } from '@nestjs/testing';
import { PatientSymptomService } from './patient-symptom.service';

describe('PatientSymptomService', () => {
  let service: PatientSymptomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientSymptomService],
    }).compile();

    service = module.get<PatientSymptomService>(PatientSymptomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
