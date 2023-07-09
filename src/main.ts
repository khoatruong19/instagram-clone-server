import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe, BadRequestException} from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = errors.map((error) => ({
        field: error.property,
        message: error.constraints[Object.keys(error.constraints)[0]],
      }));
      return new BadRequestException(result);
    },
  }))
  app.enableCors();
  await app.listen(4000);
}
bootstrap();