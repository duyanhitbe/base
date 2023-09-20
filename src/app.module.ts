import { ApisModule } from '@apis/apis.module';
import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmFilter } from './common/filters/typeorm.filter';
import { CronModule } from './modules/cron/cron.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
	imports: [
		DatabaseModule,
		ConfigModule.forRoot({
			isGlobal: true
		}),
		CronModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: () => ({
				global: true
			})
		}),
		EventEmitterModule.forRoot({
			maxListeners: 20
		}),
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
			provide: APP_FILTER,
			useClass: TypeOrmFilter
		}
	]
})
export class AppModule {}
