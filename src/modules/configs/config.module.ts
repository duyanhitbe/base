import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().default('development'),
				PORT: Joi.number().default(3000),

				DB_HOST: Joi.string().default('localhost'),
				DB_PORT: Joi.number().default(5432),
				DB_USERNAME: Joi.string().required(),
				DB_PASSWORD: Joi.string().required(),
				DB_NAME: Joi.string().required(),

				REDIS_HOST: Joi.string().default('localhost'),
				REDIS_PORT: Joi.number().default(6379),
				REDIS_DB: Joi.number().default(1),
				REDIS_PASSWORD: Joi.string().required(),
				REDIS_PREFIX: Joi.string().required(),

				SECRET_JWT: Joi.string().required()
			})
		})
	]
})
export class ConfigModule {}
