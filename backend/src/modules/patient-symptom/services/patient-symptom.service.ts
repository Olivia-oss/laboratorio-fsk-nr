import { ConflictException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { PatientSymptom } from '../schemas/patient-symptom.schema';
import { Connection, Model } from 'mongoose';
import { CreatePatientSymptomDto } from '../dtos/create_patient_symptom.dto';

@Injectable()
export class PatientSymptomService {
  constructor(
    @InjectModel(PatientSymptom.name)
    private readonly patienSympModel: Model<PatientSymptom>,
  ) {}

  async getSympyoms() {
    try {
      return await this.patienSympModel
        .find()
        .select('_id idSymptom idPatient')
        .populate({
          path: 'idSymptom',
          select: 'name description -_id',
        })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async getByIdPatient(idPatient: string) {
    try {
      return await this.patienSympModel
        .find({ idPatient })
        .select('_id idSymptom')
        .populate({
          path: 'idSymptom',
          select: 'name description -_id',
        })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async createPatientSymptom(pantienSympDTO: CreatePatientSymptomDto) {
    try {
      const symptomExist = await this.patienSympModel.findOne({
        idSymptom: pantienSympDTO.idSymptom,
        idPatient: pantienSympDTO.idPatient,
      });
      if (symptomExist) {
        throw new ConflictException('Symptom already exist with this patient');
      }
      const patiendSympCreate = new this.patienSympModel(pantienSympDTO);
      return patiendSympCreate.save();
    } catch (error) {
      throw error;
    }
  }

  async deletePatientSymtom(id: string) {
    try {
      const patineSympDelete = await this.patienSympModel.findByIdAndDelete(id);
      if (patineSympDelete) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async deletePatientSymtomByPatient(idPatient: string, session: any) {
    try {
      const patineSympDelete = await this.patienSympModel.findOneAndDelete(
        { idPatient },
        { session },
      );
      if (patineSympDelete) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async deletePatientSymtomBySymptom(idSymptom: string, session: any) {
    try {
      const patineSympDelete = await this.patienSympModel.findOneAndDelete(
        { idSymptom },
        { session },
      );
      if (patineSympDelete) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
