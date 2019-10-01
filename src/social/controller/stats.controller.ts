import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { StatsService } from '../service/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // @Get()
  // async getTest(): Promise<{}> {
  //   return await this.statsService.getTest();
  // }
  @Get('/visits')
  async getVisitsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getVisitsWithinDateRange(fromDate, toDate);
  }

  @Get('/comments')
  async getCommentsWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getCommentsWithinDateRange(fromDate, toDate);
  }

  @Get('/likes')
  async getLikesWithinDateRange(@Query() query): Promise<{}> {
    const { fromDate, toDate } = query;
    return await this.statsService.getLikesWithinDateRange(fromDate, toDate);
  }
}
