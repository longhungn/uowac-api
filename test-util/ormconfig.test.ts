import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'test',
  password: 'test',
  port: 5432,
  database: 'uowac_test',
  entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
  logging: true,
  logger: 'file',
};

export default config;
