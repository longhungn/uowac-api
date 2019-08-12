import { strict as assert } from 'assert';
require('dotenv').config();
const ormConfig: any[] = require('../ormconfig');

export function getOrmConfig(env: string = 'development') {
  console.log('Getting orm config for env ' + process.env.NODE_ENV || env);

  const envs = ['development', 'staging', 'production', 'test'];
  assert.ok(envs.includes(env));

  const targetConfig = ormConfig.find(conf => conf.name === env);
  targetConfig.name = 'default'; //set name to "default" so we dont have to specify connection name in nestjs

  return targetConfig;
}
