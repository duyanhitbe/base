import { SCHEMA } from "src/modules/configs/env";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1703145694807 implements MigrationInterface {
    name = 'Init1703145694807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "${SCHEMA}"."application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_567785297bc3ec94eef48efed1a" UNIQUE ("username"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "${SCHEMA}"."merchant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "applicationId" uuid NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_0369e7853b1a4d8e366c7b3b796" UNIQUE ("username"), CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "${SCHEMA}"."admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "${SCHEMA}"."merchant" ADD CONSTRAINT "FK_006190997512de2c8c416c71413" FOREIGN KEY ("applicationId") REFERENCES "${SCHEMA}"."application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "${SCHEMA}"."merchant" DROP CONSTRAINT "FK_006190997512de2c8c416c71413"`);
        await queryRunner.query(`DROP TABLE "${SCHEMA}"."admin"`);
        await queryRunner.query(`DROP TABLE "${SCHEMA}"."merchant"`);
        await queryRunner.query(`DROP TABLE "${SCHEMA}"."application"`);
    }

}
