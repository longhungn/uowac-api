import { Type } from '@nestjs/common';

export class MockEntityManager {
  find: jest.Mock = jest.fn();
  save: jest.Mock = jest.fn();
  findOne: jest.Mock = jest.fn();
  create: jest.Mock = jest.fn();
  merge: jest.Mock = jest
    .fn()
    .mockImplementation((type: Type<any>, target, src) => {
      return Object.assign(new type(), target, src);
    });
  findOneOrFail = jest.fn();
  remove = jest.fn();
  count = jest.fn();
  preload = jest.fn();
}
