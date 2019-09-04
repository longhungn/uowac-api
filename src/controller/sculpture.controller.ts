import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  Query,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { SculptureService } from '../service/sculpture.service';
import { DtoCreateSculpture } from '../interface/create-sculpture.dto';
import { Sculpture } from '../entity/sculpture.entity';

@Controller('sculpture')
export class SculptureController {
  constructor(private readonly sculptureService: SculptureService) {}

  @Get()
  async getAllSculptures() {
    return await this.sculptureService.allSculptures();
  }

  @Get('/:id')
  async getSculptureById(@Param('id') id: string): Promise<Sculpture> {
    const sculpture = await this.sculptureService.getSculptureById(id);
    if (!sculpture) {
      throw new NotFoundException(
        `Could not find specified sculpture with id "${id}"`
      );
    }

    return sculpture;
  }

  @Post()
  async createSculpture(
    @Body() dtoCreateSculpture: DtoCreateSculpture
  ): Promise<Sculpture> {
    return await this.sculptureService.createSculpture(dtoCreateSculpture);
  }

  @Delete('/:id')
  async deleteSculpture(@Param('id') id: string): Promise<void> {
    await this.sculptureService.deleteSculpture(id);
  }

  @Patch()
  async updateSculpture(
    @Body() dtoUpdateSculpture: DtoCreateSculpture
  ): Promise<Sculpture> {
    return this.sculptureService.updateSculpture(dtoUpdateSculpture);
  }
}
