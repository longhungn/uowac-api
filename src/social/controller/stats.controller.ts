import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from '../service/stats.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // @Get()
  // async getTest(): Promise<{}> {
  //   return await this.statsService.getTest();
  // }
  @Get('/visits')
  @UseGuards(AuthGuard())
  async getVisitsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getVisitsWithinDateRange(fromDate, toDate);
  }

  @Get('/comments')
  @UseGuards(AuthGuard())
  async getCommentsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getCommentsWithinDateRange(fromDate, toDate);
  }

  @Get('/likes')
  @UseGuards(AuthGuard())
  async getLikesWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getLikesWithinDateRange(fromDate, toDate);
  }

  @Get('/total/visits')
  @UseGuards(AuthGuard())
  async getTotalVisits(): Promise<{}> {
    const totalVisits = await this.statsService.getTotalVisits();
    return { totalVisits };
  }

  @Get('/total/likes')
  @UseGuards(AuthGuard())
  async getTotalLikes(): Promise<{}> {
    const totalLikes = await this.statsService.getTotalLikes();
    return { totalLikes };
  }

  @Get('/total/comments')
  @UseGuards(AuthGuard())
  async getTotalComments(): Promise<{}> {
    const totalComments = await this.statsService.getTotalComments();
    return { totalComments };
  }

  @Get('/total/users')
  @UseGuards(AuthGuard())
  async getTotalUsers(): Promise<{}> {
    const totalUsers = await this.statsService.getTotalUsers();
    return { totalUsers };
  }
}
