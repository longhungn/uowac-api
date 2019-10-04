import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UseGuards,
  Param,
} from '@nestjs/common';
import { StatsService } from '../service/stats.service';
import { AuthGuard } from '@nestjs/passport';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // Visit Stats
  @Get('/visits')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getVisitsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getVisitsWithinDateRange(fromDate, toDate);
  }

  @Get('/visits/:sculptureId')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getVisitsWithinDateRangeForSculptureId(
    @Query() query,
    @Param('sculptureId') sculptureId: string
  ): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getVisitsWithinDateRange(
      fromDate,
      toDate,
      sculptureId
    );
  }

  // Comment Stats
  @Get('/comments')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getCommentsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getCommentsWithinDateRange(fromDate, toDate);
  }

  @Get('/comments/:sculptureId')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getCommentsWithinDateRangeForSculptureId(
    @Query() query,
    @Param('sculptureId') sculptureId: string
  ): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getCommentsWithinDateRange(
      fromDate,
      toDate,
      sculptureId
    );
  }

  // Like Stats
  @Get('/likes')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getLikesWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getLikesWithinDateRange(fromDate, toDate);
  }

  @Get('/likes/:sculptureId')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getLikesWithinDateRangeForSculptureId(
    @Query() query,
    @Param('sculptureId') sculptureId: string
  ): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getLikesWithinDateRange(
      fromDate,
      toDate,
      sculptureId
    );
  }

  // User Stats
  @Get('/users')
  // @UseGuards(AuthGuard(), ScopesGuard)
  // @Scopes('view:analytics')
  async getUsersWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getUsersWithinDateRange(fromDate, toDate);
  }

  @Get('/total/visits')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getTotalVisits(): Promise<{}> {
    const totalVisits = await this.statsService.getTotalVisits();
    return { totalVisits };
  }

  @Get('/total/likes')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getTotalLikes(): Promise<{}> {
    const totalLikes = await this.statsService.getTotalLikes();
    return { totalLikes };
  }

  @Get('/total/comments')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getTotalComments(): Promise<{}> {
    const totalComments = await this.statsService.getTotalComments();
    return { totalComments };
  }

  @Get('/total/users')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getTotalUsers(): Promise<{}> {
    const totalUsers = await this.statsService.getTotalUsers();
    return { totalUsers };
  }
}
