import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  ValidationExceptionFilter,
} from './interceptor/all-exception.filters';
import { ResponseTransformInterceptor } from './interceptor/transform.response.interceptor';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // dto 타입 제한
  app.useGlobalPipes(
    new ValidationPipe({
      // dto 정의한 타입만 허용
      whitelist: true,
      forbidNonWhitelisted: true,
      // dto 타입 자동 변환
      transform: true,
      transformOptions: {
        // 타입 암묵적 허용
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        logger.error('exceptionFactory', errors);
        return new BadRequestException(errors);
      },
    }),
  );

  // response 객체에 result:true 프로퍼티 추가
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  // sql 에러 처리
  app.useGlobalFilters(new AllExceptionsFilter());

  // validation 에러 처리
  app.useGlobalFilters(new ValidationExceptionFilter());

  // swagger 설정
  const SwaggerOptions = new DocumentBuilder()
    .setTitle('Camp API ' + process.env.NODE_ENV)
    .setDescription('캠핑장 API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'Bearer ',
      in: 'header',
      name: 'Authorization',
      description: '로그인 후 받는 토큰 입력',
    })
    .build();
  const document = SwaggerModule.createDocument(app, SwaggerOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
