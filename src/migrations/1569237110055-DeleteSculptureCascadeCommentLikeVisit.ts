import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteSculptureCascadeCommentLikeVisit1569237110055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_27531e380326b478dacdd7b86d9"`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_8a6c5a3f627110a160144b53625"`, undefined);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`, undefined);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_5b07fb00ddfc7eec222d7cd4257"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7219888fb060cd3b7f4e10378a1"`, undefined);
        await queryRunner.query(`ALTER TABLE "sculpture_image" DROP CONSTRAINT "FK_picture_sculpture"`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_27531e380326b478dacdd7b86d9" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_8a6c5a3f627110a160144b53625" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_5b07fb00ddfc7eec222d7cd4257" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7219888fb060cd3b7f4e10378a1" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "sculpture_image" ADD CONSTRAINT "FK_49fc2d7b4b8e0b73c1ba8b1f9ff" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture_image" DROP CONSTRAINT "FK_49fc2d7b4b8e0b73c1ba8b1f9ff"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7219888fb060cd3b7f4e10378a1"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`, undefined);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_5b07fb00ddfc7eec222d7cd4257"`, undefined);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_8a6c5a3f627110a160144b53625"`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_27531e380326b478dacdd7b86d9"`, undefined);
        await queryRunner.query(`ALTER TABLE "sculpture_image" ADD CONSTRAINT "FK_picture_sculpture" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7219888fb060cd3b7f4e10378a1" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_5b07fb00ddfc7eec222d7cd4257" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_8a6c5a3f627110a160144b53625" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_27531e380326b478dacdd7b86d9" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
    }

}
