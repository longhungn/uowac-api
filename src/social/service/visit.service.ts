import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';
import { DtoCreateVisit } from '../interface/create-visit.dto';
import { Visit } from '../entity/visit.entity';
/**
 * Service class to handle logic for creating, reading
 * and deleting visits
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
@Injectable()
export class VisitService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async verifyUserExistence(userId: string): Promise<User> {
    const user = await this.manager.findOne(User, { userId });

    if (!user) {
      throw new NotFoundException(`There is no user with id ${userId}`);
    }

    return user;
  }

  async verifySculptureExistence(sculptureId: string): Promise<Sculpture> {
    const sculpture = await this.manager.findOne(Sculpture, {
      accessionId: sculptureId,
    });

    if (!sculpture) {
      throw new NotFoundException(
        `There is no sculpture with id ${sculptureId}`
      );
    }

    return sculpture;
  }

  async checkDuplicateVisit(userId, sculptureId): Promise<Visit> {
    const visit = await this.manager.findOne(Visit, {
      userId,
      sculptureId,
    });

    if (visit) {
      throw new InternalServerErrorException(
        'You have already visited this sculpture'
      );
    }
    return visit;
  }

  async createVisit(userId, sculptureId): Promise<Visit> {
    // Uncomment verifyUserExistence() verifySculptureExistence() for more clarification of Foreign key error
    await this.verifyUserExistence(userId);
    await this.verifySculptureExistence(sculptureId);
    await this.checkDuplicateVisit(userId, sculptureId);

    const visit = await this.manager.create(Visit, {
      userId,
      sculptureId,
    });
    const result = await this.manager.save(visit);

    const extraInfo = await this.manager
      .createQueryBuilder(Visit, 'visit')
      .select('visit')
      .addSelect([
        'user.userId',
        'user.picture',
        'user.name',
        'user.nickname',
        'sculpture.accessionId',
        'sculpture.name',
      ])
      .leftJoin('visit.user', 'user')
      .leftJoin('visit.sculpture', 'sculpture')
      .leftJoinAndMapMany('sculpture.images', 'sculpture.images', 'image')
      .where('visit.visitId = :visitId', { visitId: result.visitId })
      .getOne();

    return { ...result, ...extraInfo };
  }

  async getVisitById(visitId: string): Promise<Visit> {
    const visit = await this.manager.findOne(Visit, { visitId });

    if (!visit) {
      throw new NotFoundException(`Visit with id ${visitId} does not exist`);
    }

    return visit;
  }

  async visitQueryBuilder() {
    const query = await this.manager
      .createQueryBuilder(Visit, 'visit')
      .select('visit')
      .addSelect([
        'user.userId',
        'user.picture',
        'user.name',
        'user.nickname',
        'sculpture.accessionId',
        'sculpture.name',
      ])
      .leftJoin('visit.user', 'user')
      .leftJoin('visit.sculpture', 'sculpture')
      .leftJoinAndMapMany('sculpture.images', 'sculpture.images', 'image');

    return query;
  }

  async getAllVisits(): Promise<Visit[]> {
    const query = await this.visitQueryBuilder();
    const visits = query.getMany();

    return visits;
  }

  async getVisitsByUserId(userId: string): Promise<Visit[]> {
    await this.verifyUserExistence(userId);

    const query = await this.visitQueryBuilder();
    const visits = query.where('visit.userId = :userId', { userId }).getMany();

    return visits;
  }

  async getVisitsBySculptureId(sculptureId: string): Promise<Visit[]> {
    await this.verifySculptureExistence(sculptureId);

    const query = await this.visitQueryBuilder();
    const visits = query
      .where('visit.sculptureId = :sculptureId', { sculptureId })
      .getMany();

    return visits;
  }

  async deleteVisit(visitId: string): Promise<void> {
    const visit = await this.getVisitById(visitId);

    await this.manager.remove(visit);
  }
}
