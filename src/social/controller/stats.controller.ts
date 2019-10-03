import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from '../service/stats.service';
import { AuthGuard } from '@nestjs/passport';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('/visits')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getVisitsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getVisitsWithinDateRange(fromDate, toDate);
  }

  @Get('/comments')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getCommentsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getCommentsWithinDateRange(fromDate, toDate);
  }

  @Get('/likes')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getLikesWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getLikesWithinDateRange(fromDate, toDate);
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
