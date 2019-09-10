import {MigrationInterface, QueryRunner} from "typeorm";

export class SculptureMakerFKSetNullOnDelete1567873724918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture" DROP CONSTRAINT "FK_ec180953b670cd6a22c11f92871"`);
        await queryRunner.query(`ALTER TABLE "sculpture" ADD CONSTRAINT "FK_ec180953b670cd6a22c11f92871" FOREIGN KEY ("primaryMakerId") REFERENCES "sculpture_maker"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture" DROP CONSTRAINT "FK_ec180953b670cd6a22c11f92871"`);
        await queryRunner.query(`ALTER TABLE "sculpture" ADD CONSTRAINT "FK_ec180953b670cd6a22c11f92871" FOREIGN KEY ("primaryMakerId") REFERENCES "sculpture_maker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
