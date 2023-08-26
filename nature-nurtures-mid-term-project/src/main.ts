import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
//async function bootstrap() {
//const app = await NestFactory.create(AppModule);
//app.use(
//session({
//secret: 'my-secret',
// resave: false,
// saveUninitialized: false,
// }),
//);
// await app.listen(3000);
//}
//bootstrap();


import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
