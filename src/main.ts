import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppTourinoModule } from './app.tourino.module';
import { swaggerOptions } from './swagger.config';


async function bootstrap()
{
	const app = await NestFactory.create(AppTourinoModule, { abortOnError: true });
	const document = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('api', app, document);
	await app.listen(4000);
}
void bootstrap();
