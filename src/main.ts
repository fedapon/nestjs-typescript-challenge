import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('nestjs-typescript-challenge')
    .setDescription(
      'This challenge uses Nest.js as its framework to implement three API Rest endpoints (agents, customers and orders) with passportjs authentication.',
    )
    .addTag('Auth')
    .addTag('Agents')
    .addTag('Customers')
    .addTag('Orders')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
