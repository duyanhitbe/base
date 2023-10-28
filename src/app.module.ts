import { ApisModule } from '@apis/apis.module';
import { FormatResponseInterceptor, HttpFilter, LoggerMiddleware, TypeOrmFilter } from '@common';
import {
	ClassSerializerInterceptor,
	MiddlewareConsumer,
	Module,
	NestModule,
	ValidationPipe
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronModule } from './modules/cron/cron.module';
import { DatabaseModule } from './modules/database/database.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: () => ({
				global: true
			})
		}),
		EventEmitterModule.forRoot({
			maxListeners: 20
		}),
		DatabaseModule,
		CronModule,
		RedisModule,
		ApisModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: FormatResponseInterceptor
		},
		{
			provide: APP_FILTER,
			useClass: TypeOrmFilter
		},
		{
			provide: APP_FILTER,
			useClass: HttpFilter
		}
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
