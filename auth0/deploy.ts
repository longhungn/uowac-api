import { deploy } from 'auth0-deploy-cli';
import * as path from 'path';
import { config } from './config';

console.log('Loaded config for', config.AUTH0_DOMAIN);

deploy({
  input_file: path.join(__dirname, 'tenant.yaml'),
  config: config,
})
  .then(() => console.log('Deploy successful'))
  .catch(err => {
    console.log('Deploy failed');
    console.log(err);
  });
