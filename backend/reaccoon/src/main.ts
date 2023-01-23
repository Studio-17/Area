import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  const port = +configService.get<number>('APP_PORT');
  const host = configService.get('APP_HOST');
  await app.listen(port, () => {
    console.log(`Listening at ${host}:${port}`);
  });
}
bootstrap();
