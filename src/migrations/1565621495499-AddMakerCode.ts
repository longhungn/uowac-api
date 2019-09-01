import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMakerCode1565621495499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture_maker" ADD "code" character varying`);
        await queryRunner.query(`ALTER TABLE "sculpture_maker" ADD CONSTRAINT "UQ__sculpture_maker__code" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture_maker" DROP CONSTRAINT "UQ__sculpture_maker__code"`);
        await queryRunner.query(`ALTER TABLE "sculpture_maker" DROP COLUMN "code"`);
    }

}
