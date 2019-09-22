import { ViewEntity, ViewColumn, OneToOne, JoinColumn } from 'typeorm';
import { Sculpture } from './sculpture.entity';

@ViewEntity('SculptureStats', {
  expression: `
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
