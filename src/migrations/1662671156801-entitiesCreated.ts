import { MigrationInterface, QueryRunner } from "typeorm";

export class entitiesCreated1662671156801 implements MigrationInterface {
    name = 'entitiesCreated1662671156801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "courseId" uuid, "teacherId" uuid, CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b" UNIQUE ("name"), CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(255) NOT NULL, "courseId" uuid, "userId" uuid, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "birthdate" TIMESTAMP NOT NULL, "cpf" character varying(14) NOT NULL, "telephone" character varying(10) NOT NULL, "cellphone" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."user_type_enum" NOT NULL DEFAULT 'Estudante', "sex" "public"."user_sex_enum" NOT NULL DEFAULT 'null', "email" character varying(150) NOT NULL, "password" character varying(255) NOT NULL, "is_adm" boolean NOT NULL DEFAULT false, "courseId" uuid, CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_42ef5beec926f688bb960cb5479" UNIQUE ("name"), CONSTRAINT "PK_048a1055a819e5a0c07dc60ec11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "typeId" uuid, CONSTRAINT "UQ_30d559218724a6d6e0cc4f26b0e" UNIQUE ("name"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_1b8c18efb3f2ecaf5603e2729ee" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_8465191943752aee14abd9988b5" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_1283cbb80fa7bddb804f81fa10d" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_660cced3eb3232d317a712dd001" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_860adb709ddcd7089a642dd0ae6" FOREIGN KEY ("typeId") REFERENCES "type_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_860adb709ddcd7089a642dd0ae6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_660cced3eb3232d317a712dd001"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_1283cbb80fa7bddb804f81fa10d"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_8465191943752aee14abd9988b5"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_1b8c18efb3f2ecaf5603e2729ee"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "type_course"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "grade"`);
    }

}
