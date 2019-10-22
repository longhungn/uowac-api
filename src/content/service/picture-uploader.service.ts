import { Injectable, Scope } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { IMulterUploadedFile } from '../interface/multer-uploaded-file.interface';
require('dotenv').config();
/**
 * A class that handles uploading images to
 * and deleting images from AWS S3 server.
 *
 * A wrapper around aws-sdk library
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
@Injectable({ scope: Scope.TRANSIENT }) // transient scope so that there can be multiple instances in the app
export class PictureUploader {
  public AWS_S3_BUCKET_NAME: string;
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

  /**
   * Set bucket this uploader instance should use. Bucket should already exist
   * @param bucketName
   */
  setBucketName(bucketName: string) {
    this.AWS_S3_BUCKET_NAME = bucketName;
  }

  /**
   * Method to upload an image to S3
   * @param file the image file
   * @param urlKey file name the image should be stored as in S3. Can specify
   * a folder in the form `'folder_name/file_name.png'`
   *
   * @returns full URL to the newly uploaded image
   */
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

  /**
   * Delete an image file from S3
   * @param bucket name of bucket the image was stored in
   * @param key file name of the image
   */
  async deleteImageFromS3(bucket: string, key: string): Promise<void> {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }

  /**
   * A wrapper around `deleteImageFromS3`. Provided for convenience
   * @param url full URL to the image. Example: `https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/foo/bar.JPG`
   */
  async deleteImageFromS3url(url: string) {
    if (!url.includes('amazonaws.com')) {
      // url is not a s3 url
      return;
    }

    const urlObj = new URL(url);
    const bucket = urlObj.hostname.split('.')[0];
    const key = urlObj.pathname;

    return this.deleteImageFromS3(bucket, key);
  }
}
