import { RequestMethod, ValidationPipe } from '@nestjs/common';
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

  const port = +configService.get<number>('API_PORT');
  const host = configService.get('APP_HOST');
  const suffix = configService.get('APP_ENDPOINT');

  app.setGlobalPrefix(suffix, {
    exclude: [{ path: 'about.json', method: RequestMethod.GET }],
  });

  // app.use(helmet());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.enableCors({ methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' });

  const config = new DocumentBuilder()
    .setTitle('Reaccoon API')
    .setDescription('Welcome to the Reaccoon API Documentation')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${suffix}/docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}${suffix}`);
  });
  await console.log(`Reaccoon API documentation available at http://${host}:${port}${suffix}/docs`);
}

bootstrap().then(() => console.log('Reaccoon API started !'));
