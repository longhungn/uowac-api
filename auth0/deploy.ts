import { deploy } from 'auth0-deploy-cli';
import * as path from 'path';
import { config } from './config';

console.log(config);

deploy({
  input_file: path.join(__dirname, 'tenant.yaml'),
  config: config,
})
  .then(() => console.log('Deploy successful'))
  .catch(err => {
    console.log('Deploy failed');
    console.log(err);
  });
