import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SculptureImage } from '../entity/image.entity';
import { Sculpture } from '../entity/sculpture.entity';
import { EntityDoesNotExistError } from '../error/entity-not-exist.error';
import { IMulterUploadedFile } from '../interface/multer-uploaded-file.interface';
import { PictureUploader } from './picture-uploader.service';

@Injectable()
export class SculptureImageService {
  private readonly logger = new Logger(SculptureImageService.name);

  constructor(
    private readonly manager: EntityManager,
    private readonly uploader: PictureUploader
  ) {
    this.uploader.setBucketName(process.env.AWS_S3_PICTURE_BUCKET_NAME);
  }

  //Overload
  async insertPicture(
    sculpture: Sculpture,
    pictureFile: IMulterUploadedFile
  ): Promise<SculptureImage>;

  async insertPicture(
    accessionId: string,
    pictureFile: IMulterUploadedFile
  ): Promise<SculptureImage>;

  async insertPicture(
    sculptureIdOrObj: string | Sculpture,
    pictureFile: IMulterUploadedFile
  ): Promise<SculptureImage> {
    let accessionId;
    if (sculptureIdOrObj instanceof Sculpture) {
      accessionId = sculptureIdOrObj.accessionId;
    } else {
      accessionId = sculptureIdOrObj;
    }

    try {
      const sculpture = this.manager.findOneOrFail(Sculpture, accessionId);
    } catch (e) {
      this.logger.error(e.toString());
      throw new EntityDoesNotExistError('Could not find specified sculpture');
    }

    //prettier-ignore
    const fileName = `${accessionId}/${Date.now().toString()}-${pictureFile.originalname}`;

    const url: string = await this.uploader.uploadImageToS3(
      pictureFile,
      fileName
    );

    const pic = this.manager.create(SculptureImage, {
      sculptureId: accessionId,
      url: url,
      s3bucket: this.uploader.AWS_S3_BUCKET_NAME,
      s3key: fileName,
    });

    return await this.manager.save(pic);
  }

  //Overload
  async deletePicture(pictureId: string): Promise<SculptureImage>;
  async deletePicture(picture: SculptureImage): Promise<SculptureImage>;
  async deletePicture(
    pictureIdOrObj: string | SculptureImage
  ): Promise<SculptureImage> {
    const id =
      pictureIdOrObj instanceof SculptureImage
        ? pictureIdOrObj.id
        : pictureIdOrObj;

    let pic: SculptureImage;
    try {
      pic = await this.manager.findOneOrFail(SculptureImage, id, {
        select: ['id', 's3bucket', 's3key'],
      });
    } catch (e) {
      this.logger.error(e.toString());
      throw new EntityDoesNotExistError('Could not find specified picture');
    }
    this.logger.log(pic);
    await this.uploader.deleteImageFromS3(pic.s3bucket, pic.s3key);

    return await this.manager.remove(pic);
  }
}
