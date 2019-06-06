import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { SculptureShort } from 'src/interface/sculpture-short.interface';
import { MissingRelationError } from 'src/error/missing-property.error';
import { Sculpture } from 'src/entity/sculpture.entity';

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

  async getSculptureById(accessionId: string): Promise<Sculpture> {
    return await this.manager.findOneOrFail(Sculpture, {
      where: {
        accessionId,
      },
      relations: ['primaryMaker'],
    });
  }
}
