import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1568468343330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" character varying NOT NULL, "email" character varying, "givenName" character varying, "familyName" character varying, "name" character varying, "nickname" character varying, "gender" character varying, "picture" character varying, "role" jsonb, CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
