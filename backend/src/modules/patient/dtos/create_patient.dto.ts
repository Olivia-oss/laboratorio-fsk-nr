import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => Number)
  @IsNotEmpty()
  phoneNumbers: number[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => String)
  @IsEmail({}, { each: true })
  @IsNotEmpty()
  emails: string[];
}
