import { TestingModule, Test } from '@nestjs/testing';

import { AppModule } from './app.module';

/**
 * Test suite for root app
 *
 * Created by: Long Hung Nguyen (longhungn)
 */

describe('AppModule (application root)', () => {
  it('should compiles', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(moduleFixture).toBeDefined();
  }, 30000);
});
