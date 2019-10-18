import { PictureUploader } from './picture-uploader.service';
import { TestingModule, Test } from '@nestjs/testing';
import { S3 } from 'aws-sdk';
import { IMulterUploadedFile } from '../interface/multer-uploaded-file.interface';

/**
 * Test suite for PictureUploader
 * Created by: Long Hung Nguyen (longhungn)
 */

describe('PictureUploader', () => {
  let service: PictureUploader;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PictureUploader],
    }).compile();

    service = await app.get(PictureUploader);
    service.setBucketName('test-buck');

    service.s3 = {
      upload: jest.fn(),
      deleteObject: jest.fn(),
    } as any;
  });

  describe('uploadImageToS3', () => {
    const file: IMulterUploadedFile = {
      buffer: Buffer.from('123123'),
      encoding: '7bit',
      fieldname: 'images',
      mimetype: 'image/png',
      originalname: 'pic.png',
    };

    const urlKey = '2019.01/pic.png';
    const mockLocation = 'https://test-buck.amazonaws.com/2019.01/pic.png';
    it('should upload the file to S3', async () => {
      service.s3.upload = jest.fn().mockImplementation(() => {
        return {
          promise() {
            return {
              Location: mockLocation,
            };
          },
        };
      });

      const res = await service.uploadImageToS3(file, urlKey);

      expect(res).toEqual(mockLocation);

      expect(service.s3.upload).toBeCalledWith({
        Bucket: 'test-buck',
        Key: urlKey,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
        ContentEncoding: file.encoding,
      });
    });
  });

  describe('deleteImageFromS3Url', () => {
    it('should call deleteImageFromS3 with correct params', async () => {
      const mockLocation = 'https://test-buck.amazonaws.com/2019.01/pic.png';
      service.deleteImageFromS3 = jest.fn().mockResolvedValue({});

      await service.deleteImageFromS3url(mockLocation);

      expect(service.deleteImageFromS3).toBeCalledWith(
        'test-buck',
        '/2019.01/pic.png'
      );
    });
  });
});
