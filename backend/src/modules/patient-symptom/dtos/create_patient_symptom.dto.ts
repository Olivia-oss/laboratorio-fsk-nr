import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientSymptom {
  @IsString()
  @IsNotEmpty()
  idPatient: string;

  @IsString()
  @IsNotEmpty()
  idSymptom: string;
}
