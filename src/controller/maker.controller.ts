import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  NotFoundException,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SculptureMakerService } from '../service/sculpture-maker.service';
import { DtoCreateMaker } from '../interface/create-maker.dto';
import { SculptureMaker } from '../entity/maker.entity';
import { DtoUpdateMaker } from '../interface/update-maker.dto';

@Controller('maker')
export class MakerController {
  constructor(private readonly makerService: SculptureMakerService) {}

  @Post()
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

  @Delete()
  async deleteMaker(@Query('id') id: string) {
    if (id) {
      await this.makerService.deleteMaker(id);
    }
  }

  @Patch()
  async updateMaker(@Body() dtoUpdateMaker: DtoUpdateMaker) {
    return await this.makerService.updateMaker(dtoUpdateMaker);
  }
}
