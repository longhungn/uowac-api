import { ViewEntity, ViewColumn } from 'typeorm';
/**
 * Object relational mapping for the `UserStats` view in the database
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
@ViewEntity('UserStats', {
  expression: `
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
  `,
})
export class UserStats {
  @ViewColumn()
  userId: string;

  @ViewColumn()
  totalLikes: number;

  @ViewColumn()
  totalComments: number;

  @ViewColumn()
  totalVisits: number;
}
