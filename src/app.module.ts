import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './utils/getOrmConfig';
import { SculptureController } from './controller/sculpture.controller';
import { SculptureService } from './service/sculpture.service';
import { Sculpture } from './entity/sculpture.entity';
import { SculptureMaker } from './entity/maker.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig(process.env.NODE_ENV)),
    // TypeOrmModule.forFeature([Sculpture, SculptureMaker]),
  ],
  controllers: [AppController, SculptureController],
  providers: [AppService, SculptureService],
})
export class AppModule {}
