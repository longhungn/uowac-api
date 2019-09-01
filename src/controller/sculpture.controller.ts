import {
  Controller,
  Get,
  Query,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { SculptureService } from '../service/sculpture.service';
import { DtoCreateSculpture } from '../interface/create-sculpture.dto';
import { Sculpture } from '../entity/sculpture.entity';

@Controller('sculpture')
export class SculptureController {
  constructor(private readonly sculptureService: SculptureService) {}

  @Get()
  async getAll() {
    return await this.sculptureService.allSculptures();
  }

  @Get()
  async getById(@Query('id') id: string) {
    try {
      return await this.sculptureService.getSculptureById(id);
    } catch (err) {
      throw new NotFoundException('Could not find specified sculpture');
    }
  }

  @Post()
  async createController(
    @Body() dtoCreateSculpture: DtoCreateSculpture
  ): Promise<Sculpture> {
    return await this.sculptureService.createSculpture(dtoCreateSculpture);
  }
}
