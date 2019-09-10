import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IMulterUploadedFile } from '../interface/multer-uploaded-file.interface';
import { SculptureService } from '../service/sculpture.service';
import { SculptureImageService } from '../service/image.service';
import { SculptureImage } from '../entity/image.entity';

@Controller('sculpture-images')
export class SculptureImageController {
  constructor(
    private readonly sculptureService: SculptureService,
    private readonly imageService: SculptureImageService
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(
    @Body() body: { accessionId: string },
    @UploadedFiles() files: IMulterUploadedFile[]
  ): Promise<SculptureImage[]> {
    const sculpture = await this.sculptureService.getSculptureById(
      body.accessionId
    );

    let promises: Promise<SculptureImage>[] = files.map(file => {
      return this.imageService.insertPicture(sculpture, file);
    });

    return await Promise.all(promises);
  }

  @Delete(':id')
  async deleteImage(@Param('id') id) {
    return await this.imageService.deletePicture(id);
  }
}
