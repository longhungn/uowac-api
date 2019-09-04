import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SculptureMaker } from '../entity/maker.entity';
import { DtoCreateMaker } from '../interface/create-maker.dto';
import { UniqueConstraintError } from '../error/unique-constraint.error';
import { DtoUpdateMaker } from '../interface/update-maker.dto';
import { EntityDoesNotExistError } from '../error/entity-not-exist.error';
import { Sculpture } from '../entity/sculpture.entity';
import { ForeignKeyError } from '../error/foreign-key.error';

@Injectable()
export class SculptureMakerService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async getAllMakers(): Promise<SculptureMaker[]> {
    return await this.manager.find(SculptureMaker, {});
  }

  async getMakerById(id: string): Promise<SculptureMaker> {
    const maker = await this.manager.findOne(SculptureMaker, { id });
    if (!maker) {
      throw new NotFoundException(
        `Could not find specified sculpture maker with id "${id}"`
      );
    }
    return maker;
  }

  async getMakerByCode(code: string): Promise<SculptureMaker> {
    return await this.manager.findOne(SculptureMaker, { code });
  }

  async createMaker(data: DtoCreateMaker): Promise<SculptureMaker> {
    const existingMaker = await this.getMakerByCode(data.code);
    if (existingMaker) {
      throw new UniqueConstraintError(SculptureMaker, 'code');
    }

    const maker = this.manager.create(SculptureMaker, data);
    return await this.manager.save(maker);
  }

  async updateMaker(data: DtoUpdateMaker): Promise<SculptureMaker> {
    try {
      let maker = await this.manager.findOneOrFail(SculptureMaker, {
        id: data.id,
      });

      maker = this.manager.merge(SculptureMaker, maker, data);
      return await this.manager.save(maker);
    } catch (err) {
      throw new EntityDoesNotExistError(
        `Sculpture maker with id ${data.id} does not exists`
      );
    }
  }

  async deleteMaker(id: string): Promise<void> {
    const maker = await this.getMakerById(id);

    if (!maker) {
      throw new EntityDoesNotExistError(
        `Sculpture maker with id ${id} does not exists`
      );
    }

    const sculptureCount = await this.countSculpturesCreated(maker);

    if (sculptureCount > 0) {
      throw new ForeignKeyError(SculptureMaker);
    }

    await this.manager.remove(maker);
  }

  private async countSculpturesCreated(maker: SculptureMaker): Promise<number> {
    return await this.manager.count(Sculpture, {
      where: {
        primaryMaker: maker,
      },
    });
  }
}
