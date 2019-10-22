import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
/**
 * Starting the web application
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //Allowing Cross-Origin-Resource-Sharing (so that React client can use the API)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
