import { MigrationInterface, QueryRunner } from "typeorm";

export class entitiesCreated1662057330228 implements MigrationInterface {
    name = 'entitiesCreated1662057330228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_30d559218724a6d6e0cc4f26b0e" UNIQUE ("name"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "birthdate" TIMESTAMP NOT NULL, "cpf" character varying(14) NOT NULL, "telephone" character varying(10) NOT NULL, "cellphone" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."user_type_enum" NOT NULL DEFAULT 'Estudante', "sex" "public"."user_sex_enum" NOT NULL DEFAULT 'null', "email" character varying(150) NOT NULL, "password" character varying(255) NOT NULL, "is_adm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_44e4e715f4d88cf10d42b3676d6" UNIQUE ("name"), CONSTRAINT "PK_0dede005ecc358d636a994f71e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b" UNIQUE ("name"), CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`DROP TABLE "type_grade"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
