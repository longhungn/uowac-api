import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IMulterUploadedFile } from '../interface/multer-uploaded-file.interface';
import { SculptureService } from '../service/sculpture.service';
import { SculptureImageService } from '../service/image.service';
import { SculptureImage } from '../entity/image.entity';
import { AuthGuard } from '@nestjs/passport';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';

/**
 * Controller for routes to upload/delete sculpture images
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
@Controller('sculpture-images')
export class SculptureImageController {
  constructor(
    private readonly sculptureService: SculptureService,
    private readonly imageService: SculptureImageService
  ) {}

  @Post()
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('update:sculpture')
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
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('update:sculpture')
  async deleteImage(@Param('id') id) {
    return await this.imageService.deletePicture(id);
  }
}
