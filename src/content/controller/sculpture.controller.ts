import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SculptureService } from '../service/sculpture.service';
import { DtoCreateSculpture } from '../interface/create-sculpture.dto';
import { Sculpture } from '../entity/sculpture.entity';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller for routes to create, get, update and delete sculptures
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
@Controller('sculpture')
export class SculptureController {
  constructor(private readonly sculptureService: SculptureService) {}

  @Get()
  async getAllSculptures() {
    const sculptures = await this.sculptureService.allSculptures();
    const sculpturesWithStats = await Promise.all(
      sculptures.map(async sculpture => {
        return await this.sculptureService.addStatsToSculpture(sculpture);
      })
    );

    return sculpturesWithStats;
  }

  @Get('/:id')
  async getSculptureById(@Param('id') id: string): Promise<Sculpture> {
    const sculpture = await this.sculptureService.getSculptureById(id);
    if (!sculpture) {
      throw new NotFoundException(
        `Could not find specified sculpture with id "${id}"`
      );
    }

    return this.sculptureService.addStatsToSculpture(sculpture);
  }

  @Post()
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('create:sculpture')
  async createSculpture(
    @Body() dtoCreateSculpture: DtoCreateSculpture
  ): Promise<Sculpture> {
    return await this.sculptureService.createSculpture(dtoCreateSculpture);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('delete:sculpture')
  async deleteSculpture(@Param('id') id: string): Promise<void> {
    await this.sculptureService.deleteSculpture(id);
  }

  @Patch()
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('update:sculpture')
  async updateSculpture(
    @Body() dtoUpdateSculpture: DtoCreateSculpture
  ): Promise<Sculpture> {
    return this.sculptureService.updateSculpture(dtoUpdateSculpture);
  }
}
