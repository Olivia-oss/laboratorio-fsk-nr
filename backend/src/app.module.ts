import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PatientModule } from './modules/patient/patient.module';
import { SymptomModule } from './modules/symptom/symptom.module';
import { PatientSymptomModule } from './modules/patient-symptom/patient-symptom.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONDODB_URI),
    AuthModule,
    PatientModule,
    SymptomModule,
    PatientSymptomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
