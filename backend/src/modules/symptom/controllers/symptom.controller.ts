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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SymptomService } from '../services/symptom.service';
import { CreateSymptomDto } from '../dtos/create_symptom.dto';
import { UpdateSymptomDto } from '../dtos/update_symptom.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

@ApiTags('Symptom')
@UseGuards(JwtAuthGuard)
@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @ApiOperation({ summary: 'Get all symptoms' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getAll() {
    try {
      const patients = await this.symptomService.getAllSymptom();
      return {
        patients,
        message: 'Request successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Create symptom' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid parameters',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'Symptom has been created successfully',
  })
  @Post()
  async create(@Body() symptomDto: CreateSymptomDto) {
    try {
      const patient = await this.symptomService.createSymptom(symptomDto);
      return {
        patient,
        message: 'Created symptom successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update symptom' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid parameters',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    description: 'Symptom has been updated successfully',
  })
  @Put('/:id')
  async update(
    @Body() symptomDto: UpdateSymptomDto,
    @Param('id') id: string,
    @Res() res,
  ) {
    try {
      const patient = await this.symptomService.updateSymptom(symptomDto, id);
      if (patient) {
        res.json({
          patient,
          message: 'Updated symptom successfully',
        });
      } else {
        res.status(404).json({
          message: 'Updated symptom failed',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete symptom' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      const isDeleted = await this.symptomService.deleteSymptom(id);

      if (isDeleted) {
        res.status(200).json({
          message: 'Deleted symptom successfully',
        });
      } else {
        res.status(404).json({
          message: 'Symptom not found',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
