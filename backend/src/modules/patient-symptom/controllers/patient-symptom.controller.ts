import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PatientSymptomService } from '../services/patient-symptom.service';
import { CreatePatientSymptomDto } from '../dtos/create_patient_symptom.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { Symptom } from 'src/modules/symptom/schemas/symptom.schema';

@ApiTags('PatientSymptom')
@UseGuards(JwtAuthGuard)
@Controller('patient-symptom')
export class PatientSymptomController {
  constructor(private readonly patientSympService: PatientSymptomService) {}

  @ApiOperation({ summary: 'Get all Symptoms' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('/patient/:id')
  async getAllByPatient(@Param('id') idPatient: string) {
    try {
      const symptoms = await this.patientSympService.getByIdPatient(idPatient);
      return {
        symptoms,
        message: 'Request successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Create a union between patient and symptom' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid parameters',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'PatientSymptom has been created successfully',
  })
  @Post()
  async create(@Body() patientSymptomDto: CreatePatientSymptomDto) {
    try {
      const patientSymCreate =
        await this.patientSympService.createPatientSymptom(patientSymptomDto);

      return {
        message: 'Created patientSymptom successfully',
        symptom: {
          _id: patientSymCreate.id,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete patientSymptom' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      const patiendSympDelete =
        await this.patientSympService.deletePatientSymtom(id);
      if (patiendSympDelete) {
        res.json({
          patientSympton: patiendSympDelete,
          message: 'Delete patientSymptom successfully',
        });
      } else {
        res.status(404).json({
          message: 'Delete patientSymptom failed',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
