import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateVisitTable1568640046226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "visit" ("visitId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "sculptureId" character varying NOT NULL, "visitTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d8fb13b0d32ee7a7bc10274bd1" PRIMARY KEY ("visitId"))`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_27531e380326b478dacdd7b86d9" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_8a6c5a3f627110a160144b53625" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE SET NULL ON UPDATE NO ACTION`);
   }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_8a6c5a3f627110a160144b53625"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_27531e380326b478dacdd7b86d9"`);
        await queryRunner.query(`DROP TABLE "visit"`);
    }

}
