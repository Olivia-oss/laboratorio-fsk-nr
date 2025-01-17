import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePatientDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsDate()
  @IsOptional()
  birhdate?: Date;

  @IsString()
  @IsOptional()
  address: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => Number)
  @IsOptional()
  phoneNumbers?: number[];

  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => String)
  @IsEmail({}, { each: true })
  @IsOptional()
  emails?: string[];
}
