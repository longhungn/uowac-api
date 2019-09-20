import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateLikeTable1568989144666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "like" ("likeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "sculptureId" character varying NOT NULL, "likedTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c7fd8b37d71a1b2194841984084" PRIMARY KEY ("likeId"))`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_5b07fb00ddfc7eec222d7cd4257" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_5b07fb00ddfc7eec222d7cd4257"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }

}
