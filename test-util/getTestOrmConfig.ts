import config from './ormconfig.test';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/**
 *
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export function getTestOrmConfig(): TypeOrmModuleOptions {
  return config;
}
