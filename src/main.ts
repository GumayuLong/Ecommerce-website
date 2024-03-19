import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('The example API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(process.env.PORT);
  console.log(`>>>>>> Server is listening to ${process.env.PORT}}`);
}
bootstrap();
