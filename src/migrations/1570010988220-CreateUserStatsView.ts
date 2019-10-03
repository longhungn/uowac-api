import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserStatsView1570010988220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE VIEW "UserStats" AS 
                                    select  "user"."userId" AS "userId", 
                                    COUNT(DISTINCT "like"."likeId") AS "totalLikes",
                                    COUNT(DISTINCT "comment"."commentId") AS "totalComments",
                                    COUNT(DISTINCT "visit"."visitId") AS "totalVisits"
                                    FROM "user" 
                                    left join "like"
                                    on "user"."userId" = "like"."userId"
                                    left join "comment"
                                    on "user"."userId" = "comment"."userId"
                                    left join "visit"
                                    on "user"."userId" = "visit"."userId"
                                    GROUP BY "user"."userId"
                                `, undefined);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","UserStats","select  \"user\".\"userId\" AS \"userId\", \n      COUNT(DISTINCT \"like\".\"likeId\") AS \"totalLikes\",\n      COUNT(DISTINCT \"comment\".\"commentId\") AS \"totalComments\",\n      COUNT(DISTINCT \"visit\".\"visitId\") AS \"totalVisits\"\n    FROM \"user\" \n    left join \"like\"\n    on \"user\".\"userId\" = \"like\".\"userId\"\n    left join \"comment\"\n    on \"user\".\"userId\" = \"comment\".\"userId\"\n    left join \"visit\"\n    on \"user\".\"userId\" = \"visit\".\"userId\"\n    GROUP BY \"user\".\"userId\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","UserStats"]);
        await queryRunner.query(`DROP VIEW "UserStats"`, undefined);
    }

}
