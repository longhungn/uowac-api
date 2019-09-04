import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, DeleteResult } from 'typeorm';
import { Sculpture } from '../entity/sculpture.entity';
import { SculptureShort } from '../interface/sculpture-short.interface';
import { MissingRelationError } from '../error/missing-property.error';
import { DtoCreateSculpture } from '../interface/create-sculpture.dto';
import { UniqueConstraintError } from '../error/unique-constraint.error';
import { EntityDoesNotExistError } from '../error/entity-not-exist.error';

@Injectable()
export class SculptureService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async allSculptures(): Promise<Sculpture[]> {
    return await this.manager.find(Sculpture, {
      relations: ['primaryMaker'],
    });
  }

  async allSculpturesShortForm(): Promise<SculptureShort[]> {
    return this.toSculptureShortFrom(await this.allSculptures());
  }

  private toSculptureShortFrom(sculptures: Sculpture[]): SculptureShort[] {
    const shortened: SculptureShort[] = sculptures.map(item => {
      if (!item.primaryMaker) {
        throw new MissingRelationError(Sculpture, 'primaryMaker');
      }
      const {
        accessionId,
        name,
        longitude,
        latitude,
        locationNotes,
        primaryMaker,
      } = item;
      return {
        accessionId: item.accessionId,
        name: item.name,
        longitude: item.longitude,
        latitude: item.latitude,
        locationNotes: item.locationNotes,
        makerName: item.primaryMaker.fullName,
      };
    });

    return shortened;
  }

  async getSculptureById(accessionId: string): Promise<Sculpture | null> {
    return await this.manager.findOne(Sculpture, {
      where: {
        accessionId,
      },
      relations: ['primaryMaker'],
    });
  }

  async createSculpture(data: DtoCreateSculpture): Promise<Sculpture> {
    const existing = await this.getSculptureById(data.accessionId);

    if (existing) {
      throw new UniqueConstraintError(Sculpture, 'accessionId');
    } else {
      const sculpture = this.manager.create(Sculpture, data);
      return await this.manager.save(sculpture);
    }
  }

  async updateSculpture(data: DtoCreateSculpture): Promise<Sculpture> {
    const sculpture: Sculpture = await this.manager.preload(Sculpture, data);

    if (!sculpture) {
      throw new EntityDoesNotExistError(
        'There is no sculpture with this accessionId: ' + data.accessionId
      );
    } else {
      return await this.manager.save(sculpture);
    }
  }

  async deleteSculpture(accessionId: string): Promise<void> {
    const sculpture = await this.getSculptureById(accessionId);
    if (!sculpture) {
      throw new EntityDoesNotExistError(
        'There is no sculpture with this accessionId: ' + accessionId
      );
    } else {
      await this.manager.remove(sculpture);
    }
  }
}
