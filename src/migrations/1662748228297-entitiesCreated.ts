import { MigrationInterface, QueryRunner } from "typeorm";

export class entitiesCreated1662748228297 implements MigrationInterface {
    name = 'entitiesCreated1662748228297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(255) NOT NULL, "courseId" uuid, "userId" uuid, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "birthdate" TIMESTAMP NOT NULL, "cpf" character varying(14) NOT NULL, "telephone" character varying(10) NOT NULL, "cellphone" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sex" "public"."student_sex_enum" NOT NULL DEFAULT 'null', "email" character varying(150) NOT NULL, "password" character varying(255) NOT NULL, "courseId" uuid, CONSTRAINT "UQ_79dfe04f9559f2e68e849df789c" UNIQUE ("cpf"), CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "birthdate" TIMESTAMP NOT NULL, "cpf" character varying(14) NOT NULL, "telephone" character varying(10) NOT NULL, "cellphone" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sex" "public"."employee_sex_enum" NOT NULL DEFAULT 'null', "email" character varying(150) NOT NULL, "password" character varying(255) NOT NULL, "is_adm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_cc5bc3cbcb7312fbc898749c5bc" UNIQUE ("cpf"), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "courseId" uuid, "teacherId" uuid, CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b" UNIQUE ("name"), CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_42ef5beec926f688bb960cb5479" UNIQUE ("name"), CONSTRAINT "PK_048a1055a819e5a0c07dc60ec11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "typeId" uuid, CONSTRAINT "UQ_30d559218724a6d6e0cc4f26b0e" UNIQUE ("name"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_1283cbb80fa7bddb804f81fa10d" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_a29d066e554ba135f0d9408c1b3" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_1b8c18efb3f2ecaf5603e2729ee" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_8465191943752aee14abd9988b5" FOREIGN KEY ("teacherId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_860adb709ddcd7089a642dd0ae6" FOREIGN KEY ("typeId") REFERENCES "type_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_860adb709ddcd7089a642dd0ae6"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_8465191943752aee14abd9988b5"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_1b8c18efb3f2ecaf5603e2729ee"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_a29d066e554ba135f0d9408c1b3"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_1283cbb80fa7bddb804f81fa10d"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "type_course"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
