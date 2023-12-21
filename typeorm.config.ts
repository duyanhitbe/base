import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Init1700796109814 } from 'src/modules/database/migrations/1700796109814-init';
import { CreateAdmin1700796155155 } from 'src/modules/database/migrations/1700796155155-create_admin';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get<string>('DB_HOST'),
	port: configService.get<number>('DB_PORT'),
	username: configService.get<string>('DB_USERNAME'),
	password: configService.get<string>('DB_PASSWORD'),
	database: configService.get<string>('DB_NAME'),
	schema: configService.get<string>('DB_SCHEMA'),
	entities: ['**/*.entity.js'],
	migrationsTableName: 'migrations',
	migrations: [Init1700796109814, CreateAdmin1700796155155]
});
