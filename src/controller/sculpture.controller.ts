import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { SculptureService } from '../service/sculpture.service';

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
}
