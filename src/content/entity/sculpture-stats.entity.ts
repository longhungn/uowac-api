import { ViewEntity, ViewColumn, OneToOne, JoinColumn } from 'typeorm';
import { Sculpture } from './sculpture.entity';

/**
 * Object relational mapping for the relational view 'SculptureStats'
 * in the database
 * Created by: Quang Minh Nguyen (qmn1312)
 */
@ViewEntity('SculptureStats', {
  expression: `
    select  "sculpture"."accessionId" AS "sculptureId", 
      COUNT(DISTINCT "like"."likeId") AS "totalLikes",
      COUNT(DISTINCT "comment"."commentId") AS "totalComments",
      COUNT(DISTINCT "visit"."visitId") AS "totalVisits"
    FROM "sculpture" 
    left join "like"
    on "sculpture"."accessionId" = "like"."sculptureId"
    left join "comment"
    on "sculpture"."accessionId" = "comment"."sculptureId"
    left join "visit"
    on "sculpture"."accessionId" = "visit"."sculptureId"
    GROUP BY "sculpture"."accessionId"
  `,
})
export class SculptureStats {
  @ViewColumn()
  sculptureId: string;

  @ViewColumn()
  totalLikes: number;

  @ViewColumn()
  totalComments: number;

  @ViewColumn()
  totalVisits: number;
}
