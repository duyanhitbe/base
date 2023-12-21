import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Init1703145694807 } from './migrations/1703145694807-init';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),
				schema: configService.get<string>('DB_SCHEMA'),
				synchronize: false,
				autoLoadEntities: true,
				migrations: [Init1703145694807],
				migrationsRun: true,
				migrationsTableName: 'migrations'
			})
		})
	]
})
export class DatabaseModule {}
