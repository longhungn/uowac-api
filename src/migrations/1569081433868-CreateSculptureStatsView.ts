import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSculptureStatsView1569081433868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE VIEW "SculptureStats" AS 
                                    select  "sculpture"."accessionId" AS "sculptureId", 
                                            COUNT("like"."sculptureId") AS "totalLikes",
                                            COUNT("comment"."sculptureId") AS "totalComments",
                                            COUNT("visit"."sculptureId") AS "totalVisits"
                                    FROM "sculpture" 
                                    left join "like"
                                    on "sculpture"."accessionId" = "like"."sculptureId"
                                    left join "comment"
                                    on "sculpture"."accessionId" = "comment"."sculptureId"
                                    left join "visit"
                                    on "sculpture"."accessionId" = "visit"."sculptureId"
                                    GROUP BY "sculpture"."accessionId"
                                `, undefined);
        await queryRunner.query(`CREATE TABLE typeorm_metadata
                                (
                                    type character varying NOT NULL,
                                    database character varying,
                                    schema character varying,
                                    "table" character varying,
                                    name character varying,
                                    value text
                                )`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","SculptureStats","select  \"sculpture\".\"accessionId\" AS \"sculptureId\", \n            COUNT(\"like\".\"sculptureId\") AS \"totalLikes\",\n            COUNT(\"comment\".\"sculptureId\") AS \"totalComments\",\n            COUNT(\"visit\".\"sculptureId\") AS \"totalVisits\"\n    FROM \"sculpture\" \n    left join \"like\"\n    on \"sculpture\".\"accessionId\" = \"like\".\"sculptureId\"\n    left join \"comment\"\n    on \"sculpture\".\"accessionId\" = \"comment\".\"sculptureId\"\n    left join \"visit\"\n    on \"sculpture\".\"accessionId\" = \"visit\".\"sculptureId\"\n    GROUP BY \"sculpture\".\"accessionId\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","SculptureStats"]);
        await queryRunner.query(`DROP VIEW "SculptureStats"`, undefined);
    }

}
