import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSymptomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
