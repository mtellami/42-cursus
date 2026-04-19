import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-catch-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RefreshTokenInterceptor } from './common/interceptors/refresh-token.interceptor';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const jwtService = app.get(JwtService);
  const listen_port = configService.get('APP_PORT');

  app.use(cookieParser());  

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: process.env.HOST_URI,
    credentials: true,
  });

  app.useGlobalInterceptors(new RefreshTokenInterceptor(jwtService));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.useGlobalFilters(new HttpExceptionFilter());

  /** enable swagger on development mode only */
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-routes-doc', app, document);
  }

  await app.listen(listen_port, () => console.log('Server start listeen to incomming requests ...'));
}

bootstrap();
