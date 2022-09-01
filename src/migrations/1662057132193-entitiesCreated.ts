import { MigrationInterface, QueryRunner } from "typeorm";

export class entitiesCreated1662057132193 implements MigrationInterface {
    name = 'entitiesCreated1662057132193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_44e4e715f4d88cf10d42b3676d6" UNIQUE ("name"), CONSTRAINT "PK_0dede005ecc358d636a994f71e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "type_grade"`);
    }

}
