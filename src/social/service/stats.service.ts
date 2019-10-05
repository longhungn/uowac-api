import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, BaseEntity } from 'typeorm';
import { Visit } from '../entity/visit.entity';
import { Comment } from '../entity/comment.entity';
import { Like } from '../entity/like.entity';
import { User } from '../../user/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';
const moment = require('moment');

@Injectable()
export class StatsService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  format(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }

  async validDate(date: string): Promise<string> {
    if (!date) {
      throw new BadRequestException('Please specify both fromDate and toDate');
    }

    if (this.format(date) == 'Invalid date') {
      throw new BadRequestException(
        `Please make both dates in format 'YYYY-MM-DD'`
      );
    }

    return this.format(date);
  }

  async validRangeDate(
    fromDate: string,
    toDate: string
  ): Promise<{ validFromDate: string; validToDate: string }> {
    const validFromDate = await this.validDate(fromDate);
    const validToDate = await this.validDate(toDate);

    if (moment(validToDate).isBefore(validFromDate)) {
      throw new BadRequestException(
        'Please specify fromDate that is before toDate'
      );
    }

    return { validFromDate, validToDate };
  }

  // General retrieve
  async retrieveStatsWithinDateRange(
    validFromDate: string,
    validToDate: string,
    entity: any,
    entityName: string,
    entityTimeColumn: string,
    sculptureId?: string
  ): Promise<{}> {
    // get all entities between fromDate and toDate

    const castDate = `CAST(("${entityName}"."${entityTimeColumn}") AS DATE)`;

    let query = await this.manager
      .createQueryBuilder(entity, entityName)
      .select([castDate + ` AS "date"`, `COUNT(*) AS "amount"`])
      .where(castDate + ` between :validFromDate and :validToDate`, {
        validFromDate,
        validToDate,
      })
      .groupBy(castDate);

    if (sculptureId) {
      const sculpture = await this.manager.findOne(Sculpture, {
        accessionId: sculptureId,
      });

      if (!sculpture) {
        throw new NotFoundException(
          `There is not sculpture with id ${sculptureId}`
        );
      }

      query = await query.andWhere(
        `"${entityName}"."sculptureId" = :sculptureId`,
        { sculptureId }
      );
    }

    let validEntities = await query.getRawMany();

    // format retrieved entities to format {date: amount}
    let formatEntities = {};
    validEntities.forEach(x => {
      formatEntities[`${this.format(x.date)}`] = Number(x.amount);
    });

    // for loop from validFromDate to validToDate to get results
    let date = validFromDate;
    let result = {};
    while (moment(date).isSameOrBefore(validToDate)) {
      const validDate = this.format(date);

      result[validDate] = formatEntities[validDate]
        ? formatEntities[validDate]
        : 0;

      date = this.format(moment(date).add(1, 'day'));
    }

    return result;
  }

  // VISITS Stats
  async getVisitsWithinDateRange(
    fromDate: string,
    toDate: string,
    sculptureId?: string
  ): Promise<{}> {
    const { validFromDate, validToDate } = await this.validRangeDate(
      fromDate,
      toDate
    );

    return await this.retrieveStatsWithinDateRange(
      validFromDate,
      validToDate,
      Visit,
      'visit',
      'visitTime',
      sculptureId
    );
  }

  // COMMENTS Stats
  async getCommentsWithinDateRange(
    fromDate: string,
    toDate: string,
    sculptureId?: string
  ): Promise<{}> {
    const { validFromDate, validToDate } = await this.validRangeDate(
      fromDate,
      toDate
    );

    return await this.retrieveStatsWithinDateRange(
      validFromDate,
      validToDate,
      Comment,
      'comment',
      'createdTime',
      sculptureId
    );
  }

  // LIKES Stats
  async getLikesWithinDateRange(
    fromDate: string,
    toDate: string,
    sculptureId?: string
  ): Promise<{}> {
    const { validFromDate, validToDate } = await this.validRangeDate(
      fromDate,
      toDate
    );

    return await this.retrieveStatsWithinDateRange(
      validFromDate,
      validToDate,
      Like,
      'like',
      'likedTime',
      sculptureId
    );
  }

  // USER Stats
  async getUsersWithinDateRange(fromDate: string, toDate: string): Promise<{}> {
    const { validFromDate, validToDate } = await this.validRangeDate(
      fromDate,
      toDate
    );

    return await this.retrieveStatsWithinDateRange(
      validFromDate,
      validToDate,
      User,
      'user',
      'joinDate'
    );
  }

  // Get total
  async getTotalEntities(entity: any, entityName: string): Promise<number> {
    const res = await this.manager
      .createQueryBuilder(entity, entityName)
      .select(['COUNT(*) AS total'])
      .getRawOne();

    return res.total;
  }

  async getTotalVisits(): Promise<number> {
    return await this.getTotalEntities(Visit, 'visit');
  }

  async getTotalLikes(): Promise<number> {
    return await this.getTotalEntities(Like, 'like');
  }

  async getTotalComments(): Promise<number> {
    return await this.getTotalEntities(Comment, 'comment');
  }

  async getTotalUsers(): Promise<number> {
    return await this.getTotalEntities(User, 'user');
  }
}
