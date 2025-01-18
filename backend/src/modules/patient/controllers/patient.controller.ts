import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dtos/create_patient.dto';
import { UpdatePatientDto } from '../dtos/update_patient.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
@ApiTags('Patient')
@UseGuards(JwtAuthGuard)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getAll() {
    try {
      const patients = await this.patientService.getAllPatient();
      return {
        patients,
        message: 'Request successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Create patient' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid parameters',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'Patient has been created successfully',
  })
  @Post()
  async create(@Body() patientDto: CreatePatientDto) {
    try {
      const patient = await this.patientService.createPatient(patientDto);
      return {
        patient,
        message: 'Created patient successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update patient' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid parameters',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'Patient has been updated successfully',
  })
  @Put('/:id')
  async update(
    @Body() patientDto: UpdatePatientDto,
    @Param('id') id: string,
    @Res() res,
  ) {
    try {
      const patient = await this.patientService.updatePatient(patientDto, id);
      if (patient) {
        res.json({
          patient,
          message: 'Updated patient successfully',
        });
      } else {
        res.status(404).json({
          message: 'Updated patient failed',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete patient' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      const isDeleted = await this.patientService.deletePatient(id);

      if (isDeleted) {
        res.status(200).json({
          message: 'Deleted patient successfully',
        });
      } else {
        res.status(404).json({
          message: 'Patient not found',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
