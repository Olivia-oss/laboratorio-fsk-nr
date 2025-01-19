import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from '../schemas/patient.schema';
import { Model } from 'mongoose';
import { CreatePatientDto } from '../dtos/create_patient.dto';
import { UpdatePatientDto } from '../dtos/update_patient.dto';
import { error } from 'console';
import { PatientSymptomService } from 'src/modules/patient-symptom/services/patient-symptom.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
    private readonly patientSymptomService: PatientSymptomService,
  ) {}

  async getAllPatient() {
    try {
      const patients = await this.patientModel.find().lean();

      const patientSymptom = await this.patientSymptomService.getSympyoms();

      const patientsWithSymptoms = patients.map((patient) => {
        // Filtrar los PatientSymptom relacionados con este paciente
        const relatedSymptoms = patientSymptom
          .filter((ps) => ps.idPatient.toString() === patient._id.toString())
          .map((ps) => ps.idSymptom); // Extraer solo los detalles del síntoma

        // Agregar la lista de síntomas al paciente
        return {
          ...patient,
          symptoms: relatedSymptoms,
        };
      });

      return patientsWithSymptoms;
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

  async deletePatient(id: string, session: any) {
    try {
      const patientDelete = await this.patientModel.findByIdAndDelete(id, {
        session,
      });
      if (patientDelete) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
