import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreateDateToSculptureImage1570244022405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture_image" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture_image" DROP COLUMN "created"`, undefined);
    }

}
