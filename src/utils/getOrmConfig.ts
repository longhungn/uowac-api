import { strict as assert } from 'assert';
import ormConfig from '../ormconfig';
require('dotenv').config();

export function getOrmConfig(env: string = 'development') {
  console.log('Getting orm config for env ' + process.env.NODE_ENV);

  const envs = ['development', 'staging', 'production', 'test'];
  assert.ok(envs.includes(env));

  return ormConfig[env];
}
