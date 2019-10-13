import config from './ormconfig.test';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export function getTestOrmConfig(): TypeOrmModuleOptions {
  return config;
}
