import { SculptureMakerService } from './sculpture-maker.service';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTestOrmConfig } from '../../../test-util/getTestOrmConfig';
import { SculptureMaker } from '../entity/maker.entity';
import * as faker from 'faker';
import { DtoCreateMaker } from '../interface/create-maker.dto';
import { EntityManager } from 'typeorm';
import { MockEntityManager } from '../../../test-util/MockEntityManger';
import { UniqueConstraintError } from '../error/unique-constraint.error';
import { DtoUpdateMaker } from '../interface/update-maker.dto';
import { EntityDoesNotExistError } from '../error/entity-not-exist.error';

let getRandomMakerDto = () => {
  const dto: DtoCreateMaker = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthYear: faker.random.number({ min: 1930, max: 1990 }),
    deathYear: faker.random.number({ min: 1991, max: 2010 }),
    nationality: faker.address.country(),
    wikiUrl: faker.internet.url(),
  };
  return dto;
};

let dtoToMaker = (dto: DtoCreateMaker) => {
  let maker = Object.assign(new SculptureMaker(), dto);
  maker.id = faker.random.uuid();
  return maker;
};

describe('SculptureMakerService', () => {
  let service: SculptureMakerService;
  let mockEntityManager: MockEntityManager;

  beforeEach(async () => {
    mockEntityManager = new MockEntityManager();

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SculptureMakerService,
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = await app.get(SculptureMakerService);
  });

  describe('createMaker', () => {
    it('successfully create a new maker', async () => {
      const dto = getRandomMakerDto();
      let maker = dtoToMaker(dto);

      mockEntityManager.create.mockReturnValue(maker);
      mockEntityManager.save.mockImplementation(async entity => entity);

      const result = await service.createMaker(dto);

      expect(mockEntityManager.create).toBeCalledWith(SculptureMaker, dto);
      expect(mockEntityManager.save).toBeCalledWith(maker);
      expect(result).toEqual(maker);
    });

    it('throws error when code is duplicated', async () => {
      const dto = getRandomMakerDto();
      dto.code = '1234';

      let maker = dtoToMaker(dto);
      service.getMakerByCode = jest.fn().mockResolvedValueOnce(maker);

      expect(service.createMaker(dto)).rejects.toThrow(UniqueConstraintError);
      expect(service.getMakerByCode).toBeCalledWith(dto.code);
    });
  });

  describe('updateMaker', () => {
    it('updates the maker successfully', async () => {
      let dto = getRandomMakerDto();
      let maker = dtoToMaker(dto);
      mockEntityManager.findOneOrFail.mockResolvedValue(maker);
      let saveRetval = Symbol();
      mockEntityManager.save.mockResolvedValue(saveRetval);

      const res = await service.updateMaker({ id: maker.id });

      console.log(mockEntityManager.merge.mock);
      expect(mockEntityManager.merge).toBeCalled();
      expect(mockEntityManager.save).toBeCalled();
      expect(res).toBe(saveRetval);
    });

    it('throws error when maker not found', async () => {
      mockEntityManager.findOneOrFail.mockRejectedValue(new Error());
      let data: DtoUpdateMaker = {
        id: '1234',
      };

      expect(service.updateMaker(data)).rejects.toThrow(
        EntityDoesNotExistError
      );
    });
  });
});
