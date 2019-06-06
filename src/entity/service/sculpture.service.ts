import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Sculpture } from '../sculpture.entity';

@Injectable()
export class SculptureService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async allSculptures(): Promise<Sculpture[]> {}

  async allSculpturesShortForm(): Promise<Sculpture[]> {}

  async getSculptureById(accessionId: string): Promise<Sculpture> {}
}
