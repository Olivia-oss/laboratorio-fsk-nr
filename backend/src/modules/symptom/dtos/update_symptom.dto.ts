import { IsOptional, IsString } from 'class-validator';

export class UpdateSymptomDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
