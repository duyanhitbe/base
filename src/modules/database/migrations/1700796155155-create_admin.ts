import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { config } from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

config();

const configService = new ConfigService();
const adminUsername = configService.get<string>('ADMIN_USERNAME');
const adminPassword = configService.get<string>('ADMIN_PASSWORD');
const schema = configService.get<string>('DB_SCHEMA');

export class CreateAdmin1700796155155 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		const [admin] = await queryRunner.query(
			`SELECT * FROM "${schema}"."admin" WHERE "username" = '${adminUsername}'`
		);
		if (!admin) {
			const password = await argon2.hash(adminPassword!);
			await queryRunner.query(
				`INSERT INTO "${schema}"."admin" ("username", "password") VALUES ('${adminUsername}', '${password}')`
			);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DELETE FROM "${schema}"."admin" WHERE "username" = '${adminUsername}'`
		);
	}
}
