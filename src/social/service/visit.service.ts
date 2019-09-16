import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../content/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';
import { DtoCreateVisit } from '../interface/create-visit.dto';
import { Visit } from '../entity/visit.entity';

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

  async createVisit(dtoCreateVisit: DtoCreateVisit): Promise<Visit> {
    // Uncomment verifyUserExistence() verifySculptureExistence() for more clarification of Foreign key error
    // const { userId, sculptureId } = dtoCreateVisit;
    // await this.verifyUserExistence(userId);
    // await this.verifySculptureExistence(sculptureId);

    const visit = await this.manager.create(Visit, dtoCreateVisit);
    return await this.manager.save(visit);
  }

  async getVisitById(visitId: string): Promise<Visit> {
    const visit = await this.manager.findOne(Visit, { visitId });

    if (!visit) {
      throw new NotFoundException(`Visit with id ${visitId} does not exist`);
    }

    return visit;
  }

  async getVisitsByUserId(userId: string): Promise<Visit[]> {
    await this.verifyUserExistence(userId);

    const visits: Visit[] = await this.manager.find(Visit, { userId });

    return visits;
  }

  async getVisitsBySculptureId(sculptureId: string): Promise<Visit[]> {
    await this.verifySculptureExistence(sculptureId);

    const visits: Visit[] = await this.manager.find(Visit, { sculptureId });

    return visits;
  }

  async deleteVisit(visitId: string): Promise<void> {
    const visit = await this.getVisitById(visitId);

    await this.manager.remove(visit);
  }
}
