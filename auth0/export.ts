/**
 * Script to extract Auth0 configurations from
 * Auth0 server specified in env variable to tenant.yaml
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
import { dump } from 'auth0-deploy-cli';
import * as path from 'path';
import { config } from './config';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

console.log('Loaded config for', config.AUTH0_DOMAIN);

main();

async function main() {
  await dump({
    output_folder: path.join(__dirname),
    config: config,
    format: 'yaml',
  })
    .then(() => console.log('Dump successful'))
    .catch(err => {
      console.log('Dump failed');
      console.log(err);
    });

  const filePath = path.join(__dirname, 'tenant.yaml');
  const fileStr = fs.readFileSync(filePath, 'utf8');
  const tenantConfig = yaml.safeLoad(fileStr);

  tenantConfig.rulesConfigs = [
    { key: 'SYNC_USER_URL', value: '##SYNC_USER_URL##' },
    { key: 'SYNC_USER_CLIENT_ID', value: '##SYNC_USER_CLIENT_ID##' },
    { key: 'SYNC_USER_CLIENT_SECRET', value: '##SYNC_USER_CLIENT_SECRET##' },
  ];

  //find User sync app
  const userSync = (tenantConfig.clientGrants as any[]).find(
    ele =>
      ele.client_id === 'User sync' &&
      ele.audience === `https://${process.env.AUTH0_DOMAIN}/api/v2/`
  );

  userSync.audience = `https://##AUTH0_DOMAIN##/api/v2/`;

  fs.writeFileSync(filePath, yaml.safeDump(tenantConfig));
  console.log('Dump completed');
}
