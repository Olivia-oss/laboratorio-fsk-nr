import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Laboratorio-test')
    .setDescription(
      'Laboratory-test API that allows registering a patient with their symptoms',
    )
    .setVersion('1.0')
    .addTag('Laboratorio-test')
    .addCookieAuth('jwt', {
      type: 'apiKey',
      in: 'cookie',
      name: 'jwt',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
