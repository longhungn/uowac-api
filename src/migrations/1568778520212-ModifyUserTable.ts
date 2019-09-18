import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyUserTable1568778520212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "joinDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "joinDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
    }

}
