import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTimeColumnType1570270585211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "visit" DROP COLUMN "visitTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" ADD "visitTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "likedTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ADD "likedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "joinDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "joinDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD "createdTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updatedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "sculpture_image" DROP COLUMN "created"`, undefined);
        await queryRunner.query(`ALTER TABLE "sculpture_image" ADD "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture_image" DROP COLUMN "created"`, undefined);
        await queryRunner.query(`ALTER TABLE "sculpture_image" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updatedTime" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD "createdTime" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "joinDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "joinDate" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "likedTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ADD "likedTime" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" DROP COLUMN "visitTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" ADD "visitTime" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

}
