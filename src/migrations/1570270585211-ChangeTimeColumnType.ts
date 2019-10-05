import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTimeColumnType1570270585211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "visit" ALTER COLUMN "visitTime" TYPE TIMESTAMP WITH TIME ZONE USING "visitTime" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ALTER COLUMN "likedTime" TYPE TIMESTAMP WITH TIME ZONE USING "likedTime" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "joinDate" TYPE TIMESTAMP WITH TIME ZONE USING "joinDate" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdTime" TYPE TIMESTAMP WITH TIME ZONE USING "createdTime" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updatedTime" TYPE TIMESTAMP WITH TIME ZONE USING "updatedTime" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "sculpture_image" ALTER COLUMN "created" TYPE TIMESTAMP WITH TIME ZONE USING "created" AT TIME ZONE 'UTC'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sculpture_image" ALTER COLUMN "created" TYPE TIMESTAMP USING "created" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updatedTime" TYPE TIMESTAMP USING "updatedTime" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdTime" TYPE TIMESTAMP USING "createdTime" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "joinDate" TYPE TIMESTAMP USING "joinDate" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "like" ALTER COLUMN "likedTime" TYPE TIMESTAMP USING "likedTime" AT TIME ZONE 'UTC'`, undefined);
        await queryRunner.query(`ALTER TABLE "visit" ALTER COLUMN "visitTime" TYPE TIMESTAMP USING "visitTime" AT TIME ZONE 'UTC'`, undefined);
    }

}
