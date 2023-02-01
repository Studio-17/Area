import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('APP_ENDPOINT'));

  app.use(helmet());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = +configService.get<number>('APP_PORT');
  const host = configService.get('APP_HOST');
  await app.listen(port, () => {
    console.log(`Listening at ${host}:${port}`);
  });
}

bootstrap().then(() => console.log('Reaccoon OAuth2.0 API started !'));
