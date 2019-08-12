import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SculptureMaker } from 'src/entity/maker.entity';
import { DtoCreateMaker } from 'src/interface/create-maker.dto';
import { UniqueConstraintError } from 'src/error/unique-constraint.error';
import { DtoUpdateMaker } from 'src/interface/update-maker.dto';
import { EntityDoesNotExistError } from 'src/error/entity-not-exist.error';
import { Sculpture } from 'src/entity/sculpture.entity';
import { ForeignKeyError } from 'src/error/foreign-key.error';

@Injectable()
export class SculptureMakerService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async getAllMakers(): Promise<SculptureMaker[]> {
    return await this.manager.find(SculptureMaker, {});
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
        code: data.code,
      });

      maker = this.manager.merge(SculptureMaker, maker, data);
      return await this.manager.save(maker);
    } catch (err) {
      throw new EntityDoesNotExistError(
        `Sculpture maker with code ${data.code} does not exists`
      );
    }
  }

  async deleteMaker(code: string) {
    const maker = await this.getMakerByCode(code);

    if (!maker) {
      throw new EntityDoesNotExistError(
        `Sculpture maker with code ${code} does not exists`
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
