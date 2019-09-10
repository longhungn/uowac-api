import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { IMulterUploadedFile } from '../interface/multer-uploaded-file.interface';
require('dotenv').config();

@Injectable()
export class PictureUploader {
  public AWS_S3_BUCKET_NAME: string = process.env.AWS_S3_PICTURE_BUCKET_NAME;
  public s3: S3;

  constructor() {
    this.s3 = new S3({
      apiVersion: '2006-03-01',
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  //returns full url to image
  async uploadImageToS3(
    file: IMulterUploadedFile,
    urlKey: string
  ): Promise<string> {
    const params = {
      Bucket: this.AWS_S3_BUCKET_NAME,
      Key: urlKey,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentEncoding: file.encoding,
    };

    const res = await this.s3.upload(params).promise();
    return res.Location;
  }

  async deleteImageFromS3(bucket: string, key: string): Promise<void> {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }
}
