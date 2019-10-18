import { Module } from '@nestjs/common';
import { SculptureController } from './controller/sculpture.controller';
import { MakerController } from './controller/maker.controller';
import { SculptureService } from './service/sculpture.service';
import { SculptureMakerService } from './service/sculpture-maker.service';
import { SculptureImageService } from './service/image.service';
import { PictureUploader } from './service/picture-uploader.service';
import { SculptureImageController } from './controller/image.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SculptureController, MakerController, SculptureImageController],
  providers: [
    SculptureService,
    SculptureMakerService,
    SculptureImageService,
    PictureUploader,
  ],
  exports: [PictureUploader],
})
export class ContentModule {}
