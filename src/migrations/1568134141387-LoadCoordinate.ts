import {MigrationInterface, QueryRunner} from "typeorm";

export class LoadCoordinate1568104854068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4049, "longitude" = 150.8779 WHERE "accessionId" = '1986.058'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4046, "longitude" = 150.8752 WHERE "accessionId" = '2015.003'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4052, "longitude" = 150.8752 WHERE "accessionId" = '1987.081'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4056, "longitude" = 150.8811 WHERE "accessionId" = '2015.076'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4072, "longitude" = 150.8815 WHERE "accessionId" = '2001.076'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4066, "longitude" = 150.8801 WHERE "accessionId" = '2012.092'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4055, "longitude" = 150.8763 WHERE "accessionId" = '1991.042'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4071, "longitude" = 150.8816 WHERE "accessionId" = '2001.077'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4055, "longitude" = 150.8782 WHERE "accessionId" = '1987.08'`);
        await queryRunner.query(`UPDATE "sculpture" SET "latitude" = -34.4059, "longitude" = 150.8701 WHERE "accessionId" = '1989.067'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
