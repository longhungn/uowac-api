import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSculptureAndMaker1559842230187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "sculpture" ("accessionId" character varying NOT NULL, "name" character varying NOT NULL, "longitude" numeric(10,7), "latitude" numeric(10,7), "primaryMakerId" uuid, "productionDate" character varying, "material" character varying, "creditLine" character varying, "currentLocation" character varying, "locationNotes" character varying, "description" character varying, CONSTRAINT "PK_4682933bfb98cfea0cd7f25401e" PRIMARY KEY ("accessionId"))`);
        await queryRunner.query(`CREATE TABLE "sculpture_maker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthYear" smallint, "deathYear" smallint, "info" character varying, "wikiUrl" character varying, "nationality" character varying, CONSTRAINT "PK_ba5cccf872a2f256863f7acd39f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sculpture" ADD CONSTRAINT "FK_ec180953b670cd6a22c11f92871" FOREIGN KEY ("primaryMakerId") REFERENCES "sculpture_maker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture" DROP CONSTRAINT "FK_ec180953b670cd6a22c11f92871"`);
        await queryRunner.query(`DROP TABLE "sculpture_maker"`);
        await queryRunner.query(`DROP TABLE "sculpture"`);
    }

}
