import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsDate()
  @IsNotEmpty()
  birhdate: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => Number)
  @IsNotEmpty()
  phoneNumbers: number[];

  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => String)
  @IsEmail({}, { each: true })
  @IsNotEmpty()
  emails: string[];
}
