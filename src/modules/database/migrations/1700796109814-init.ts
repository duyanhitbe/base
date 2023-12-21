import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1700796109814 implements MigrationInterface {
    name = 'Init1700796109814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base"."application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_bcd55dda4b91ea593ba7793b862" UNIQUE ("username"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base"."merchant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "applicationId" uuid NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_0369e7853b1a4d8e366c7b3b796" UNIQUE ("username"), CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base"."admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "base"."merchant" ADD CONSTRAINT "FK_d306a524b507f72fa8550aeffe4" FOREIGN KEY ("applicationId") REFERENCES "base"."application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base"."merchant" DROP CONSTRAINT "FK_d306a524b507f72fa8550aeffe4"`);
        await queryRunner.query(`DROP TABLE "base"."admin"`);
        await queryRunner.query(`DROP TABLE "base"."merchant"`);
        await queryRunner.query(`DROP TABLE "base"."application"`);
    }

}
