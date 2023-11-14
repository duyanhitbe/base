import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699931999870 implements MigrationInterface {
    name = 'Init1699931999870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base"."application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "clientKey" character varying NOT NULL, "secretKey" character varying NOT NULL, CONSTRAINT "UQ_b9e83f388d6007a4208a09cebca" UNIQUE ("clientKey"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base"."merchant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "applicationId" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "websiteUrl" character varying, "facebookUrl" character varying, "youtubeUrl" character varying, CONSTRAINT "UQ_546608b3c7bf7c175d3780c38f8" UNIQUE ("email"), CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base"."admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "base"."merchant" ADD CONSTRAINT "FK_006190997512de2c8c416c71413" FOREIGN KEY ("applicationId") REFERENCES "base"."application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base"."merchant" DROP CONSTRAINT "FK_006190997512de2c8c416c71413"`);
        await queryRunner.query(`DROP TABLE "base"."admin"`);
        await queryRunner.query(`DROP TABLE "base"."merchant"`);
        await queryRunner.query(`DROP TABLE "base"."application"`);
    }

}
