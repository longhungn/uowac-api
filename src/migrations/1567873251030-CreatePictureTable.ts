import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePictureTable1567873251030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "picture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "sculptureId" character varying, CONSTRAINT "PK_picture" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_picture_sculpture" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_picture_sculpture"`);
        await queryRunner.query(`DROP TABLE "picture"`);
    }

}
