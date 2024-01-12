import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerOptions } from './swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{abortOnError:true});
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
