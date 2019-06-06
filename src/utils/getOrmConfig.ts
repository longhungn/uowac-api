import { strict as assert } from 'assert';
require('dotenv').config();
const ormConfig: any[] = require('../ormconfig.ts');

export function getOrmConfig(env: string = 'development') {
  console.log('Getting orm config for env ' + process.env.NODE_ENV);

  const envs = ['development', 'staging', 'production', 'test'];
  assert.ok(envs.includes(env));

  return ormConfig.find(elem => elem.name === env);
}
