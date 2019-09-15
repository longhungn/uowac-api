import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCommentTable1568529797276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "comment" ("commentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "sculptureId" character varying NOT NULL, "createdTime" TIMESTAMP NOT NULL DEFAULT now(), "updatedTime" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, CONSTRAINT "PK_1b03586f7af11eac99f4fdbf012" PRIMARY KEY ("commentId"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7219888fb060cd3b7f4e10378a1" FOREIGN KEY ("sculptureId") REFERENCES "sculpture"("accessionId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7219888fb060cd3b7f4e10378a1"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
