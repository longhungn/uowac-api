import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './utils/getOrmConfig';
@Module({
  imports: [TypeOrmModule.forRoot(getOrmConfig(process.env.NODE_ENV))],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
