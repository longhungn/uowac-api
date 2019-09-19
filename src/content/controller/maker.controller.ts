import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SculptureMakerService } from '../service/sculpture-maker.service';
import { DtoCreateMaker } from '../interface/create-maker.dto';
import { SculptureMaker } from '../entity/maker.entity';
import { DtoUpdateMaker } from '../interface/update-maker.dto';
import { AuthGuard } from '@nestjs/passport';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';

@Controller('maker')
export class MakerController {
  constructor(private readonly makerService: SculptureMakerService) {}

  @Post()
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('create:sculpture')
  async createMaker(
    @Body() dtoCreateMaker: DtoCreateMaker
  ): Promise<SculptureMaker> {
    return await this.makerService.createMaker(dtoCreateMaker);
  }

  @Get('/:id')
  async getMakerById(@Param('id') id: string): Promise<SculptureMaker> {
    return await this.makerService.getMakerById(id);
  }

  @Get()
  async getAllMakers(): Promise<SculptureMaker[]> {
    return await this.makerService.getAllMakers();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('delete:sculpture')
  async deleteMaker(@Param('id') id: string): Promise<void> {
    await this.makerService.deleteMaker(id);
  }

  @Patch()
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('update:sculpture')
  async updateMaker(@Body() dtoUpdateMaker: DtoUpdateMaker) {
    return await this.makerService.updateMaker(dtoUpdateMaker);
  }
}
