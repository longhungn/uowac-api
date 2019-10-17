import { SculptureImageService } from './image.service';
import { MockEntityManager } from '../../../test-util/MockEntityManger';
import { TestingModule, Test } from '@nestjs/testing';
import { EntityManager } from 'typeorm';
import { IMulterUploadedFile } from '../interface/multer-uploaded-file.interface';
import { PictureUploader } from './picture-uploader.service';
import { Sculpture } from '../entity/sculpture.entity';
import { EntityDoesNotExistError } from '../error/entity-not-exist.error';
import { SculptureImage } from '../entity/image.entity';

/**
 * Test suite for SculptureImageService
 * Created by: Long Hung Nguyen (longhungn)
 */

describe('SculptureImageService', () => {
  //set env variable
  const BUCKET_NAME = 'test-bucket';

  let service: SculptureImageService;
  let mockEntityManager: MockEntityManager;
  let mockUploader;

  beforeEach(async () => {
    mockEntityManager = new MockEntityManager();
    mockUploader = {
      AWS_S3_BUCKET_NAME: null,
      deleteImageFromS3: jest.fn(),
      deleteImageFromS3url: jest.fn(),
      s3: {
        upload: jest.fn(),
        deleteObject: jest.fn(),
      },
      uploadImageToS3: jest.fn(),
      setBucketName: jest
        .fn()
        .mockImplementation(name => (this.AWS_S3_BUCKET_NAME = name)),
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SculptureImageService,
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
        {
          provide: PictureUploader,
          useValue: mockUploader,
        },
      ],
    }).compile();

    service = await app.get(SculptureImageService);
  });

  describe('insertPicture', () => {
    const imageFile: IMulterUploadedFile = {
      buffer: Buffer.from('a test string'),
      encoding: '7bit',
      fieldname: 'image',
      mimetype: 'image/png',
      originalname: 'pictureName.png',
    };

    const sculptureObj: Partial<Sculpture> = {
      accessionId: '2019.01',
      name: 'Test sculpture',
    };

    it('should upload image and attach it to a sculpture', async () => {
      mockEntityManager.findOneOrFail.mockResolvedValue(sculptureObj);
      mockUploader.uploadImageToS3.mockImplementation(
        async (file, fileName) => {
          return `https://${BUCKET_NAME}.amazonaws.com/${fileName}`;
        }
      );

      console.log('hey');
      const res = await service.insertPicture(
        sculptureObj.accessionId,
        imageFile
      );

      //expect filename to contain both accessionId and original file name
      expect(mockUploader.uploadImageToS3).toBeCalledWith(
        imageFile,
        expect.stringContaining(sculptureObj.accessionId)
      );
      expect(mockUploader.uploadImageToS3).toBeCalledWith(
        imageFile,
        expect.stringContaining(imageFile.originalname)
      );

      expect(mockEntityManager.save).toBeCalled();
    });

    it('should throw when there is no such sculpture', async () => {
      mockEntityManager.findOneOrFail.mockRejectedValue(new Error());

      await expect(
        service.insertPicture(sculptureObj.accessionId, imageFile)
      ).rejects.toThrow(EntityDoesNotExistError);
    });
  });

  describe('deletePicture', () => {
    let picture: SculptureImage = {
      created: new Date('2019-01-01'),
      id: '0bb65f06-8158-4ac0-bbbc-f22259f51a57',
      s3bucket: BUCKET_NAME,
      s3key: '2019.01/someName.png',
      sculptureId: '2019.01',
      url: `https://${BUCKET_NAME}.s3-ap-southeast-2.amazonaws.com/2019.01/1568479063691-someName.png`,
      sculpture: null,
    };
    const pictureId = 'b8131f96-a496-47cd-8529-c591e499084d';

    it('should delete the picture if it exists', async () => {
      mockEntityManager.findOneOrFail.mockResolvedValue(picture);

      const res = await service.deletePicture(picture.id);

      expect(mockUploader.deleteImageFromS3).toBeCalledWith(
        BUCKET_NAME,
        '2019.01/someName.png'
      );
      expect(mockEntityManager.remove).toBeCalledWith(picture);
    });

    it('should throw when the picture does not exist', async () => {
      mockEntityManager.findOneOrFail.mockRejectedValue(new Error());

      await expect(service.deletePicture(picture.id)).rejects.toThrow(
        EntityDoesNotExistError
      );
    });
  });
});
