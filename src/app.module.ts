import { ApisModule } from '@apis/apis.module';
import { LoggerMiddleware } from '@common';
import { CronModule, DatabaseModule, I18NModule, MailModule, RedisModule } from '@modules';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { providers } from './app.provider';

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
		MailModule,
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
