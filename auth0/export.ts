import { dump } from 'auth0-deploy-cli';
import * as path from 'path';
import { config } from './config';

console.log(config);

dump({
  output_folder: path.join(__dirname, 'tenant.yaml'),
  config: config,
})
  .then(() => console.log('Dump successful'))
  .catch(err => {
    console.log('Dump failed');
    console.log(err);
  });
