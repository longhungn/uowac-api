import { Module } from '@nestjs/common';
import { SculptureController } from './controller/sculpture.controller';
import { MakerController } from './controller/maker.controller';
import { SculptureService } from './service/sculpture.service';
import { SculptureMakerService } from './service/sculpture-maker.service';

@Module({
  controllers: [SculptureController, MakerController],
  providers: [SculptureService, SculptureMakerService],
})
export class ContentModule {}
