import { Module } from '@nestjs/common';
import { SculptureController } from './controller/sculpture.controller';
import { MakerController } from './controller/maker.controller';
import { SculptureService } from './service/sculpture.service';
import { SculptureMakerService } from './service/sculpture-maker.service';
import { SculptureImageService } from './service/image.service';
import { PictureUploader } from './service/picture-uploader.service';
import { SculptureImageController } from './controller/image.controller';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

@Module({
  controllers: [
    SculptureController,
    MakerController,
    SculptureImageController,
    UserController,
  ],
  providers: [
    SculptureService,
    SculptureMakerService,
    SculptureImageService,
    PictureUploader,
    UserService,
  ],
})
export class ContentModule {}
