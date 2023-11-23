import { ApisModule } from '@apis/apis.module';
import { LoggerMiddleware } from '@common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { providers } from './app.provider';
import { CronModule } from './modules/cron/cron.module';
import { DatabaseModule } from './modules/database/database.module';
import { I18NModule } from './modules/i18n/i18n.module';
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
		I18NModule,
		ApisModule
	],
	controllers: [AppController],
	providers
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
