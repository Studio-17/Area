import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Reaccoon API')
    .setDescription('Welcome to the Reaccoon API Documentation')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = +configService.get<number>('APP_PORT');
  const host = configService.get('APP_HOST');
  console.log(`Reaccoon API documentation available at http://${host}:${port}/api/docs/`)
  await app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`);
  });
}

bootstrap().then(() => console.log('Reaccoon API started !'));
