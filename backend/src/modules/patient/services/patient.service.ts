import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from '../schemas/patient.schema';
import { Model } from 'mongoose';
import { CreatePatientDto } from '../dtos/create_patient.dto';
import { UpdatePatientDto } from '../dtos/update_patient.dto';
import { error } from 'console';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
  ) {}

  async getAllPatient() {
    try {
      const patients = await this.patientModel.find();
      return patients;
    } catch (error) {
      throw error;
    }
  }

  async createPatient(patientDto: CreatePatientDto) {
    try {
      const patientCreate = new this.patientModel(patientDto);
      return patientCreate.save();
    } catch (error) {
      throw error;
    }
  }

  async updatePatient(patientDto: UpdatePatientDto, id: string) {
    try {
      const patientUpdate = await this.patientModel.findByIdAndUpdate(
        id,
        patientDto,
        { new: true },
      );
      return patientUpdate;
    } catch (error) {
      throw error;
    }
  }

  async deletePatient(id: string) {
    try {
      const patientDelete = await this.patientModel.findByIdAndDelete(id);
      if (patientDelete) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
