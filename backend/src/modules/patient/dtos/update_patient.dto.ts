import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birthdate?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => Number)
  @IsOptional()
  phoneNumbers?: number[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => String)
  @IsEmail({}, { each: true })
  @IsOptional()
  emails?: string[];
}
