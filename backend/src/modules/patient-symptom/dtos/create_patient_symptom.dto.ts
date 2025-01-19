import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientSymptomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idPatient: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idSymptom: string;
}
