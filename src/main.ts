import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSwagger } from './app.swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get<ConfigService>(ConfigService);

	app.enableCors({
		origin: true,
		credentials: true
	});
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});

	useSwagger(app);

	await app.listen(configService.get<string>('PORT') || 3000);
}
bootstrap();
