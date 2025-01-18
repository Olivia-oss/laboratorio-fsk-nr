import { Injectable } from '@nestjs/common';
import { Symptom } from '../schemas/symptom.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSymptomDto } from '../dtos/create_symptom.dto';
import { UpdateSymptomDto } from '../dtos/update_symptom.dto';

@Injectable()
export class SymptomService {
  constructor(
    @InjectModel(Symptom.name) private readonly symptomModel: Model<Symptom>,
  ) {}

  async getAllSymptom() {
    try {
      const symptoms = await this.symptomModel.find();
      return symptoms;
    } catch (error) {
      throw error;
    }
  }

  async createSymptom(symptomtDto: CreateSymptomDto) {
    try {
      const symptomCreate = new this.symptomModel(symptomtDto);
      return symptomCreate.save();
    } catch (error) {
      throw error;
    }
  }

  async updateSymptom(symptomDto: UpdateSymptomDto, id: string) {
    try {
      const symptomUpdate = await this.symptomModel.findByIdAndUpdate(
        id,
        symptomDto,
        { new: true },
      );
      return symptomUpdate;
    } catch (error) {
      throw error;
    }
  }

  async deleteSymptom(id: string) {
    try {
      const symptomDelete = await this.symptomModel.findByIdAndDelete(id);
      if (symptomDelete) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
