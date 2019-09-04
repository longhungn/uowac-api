import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './utils/getOrmConfig';
import { ContentModule } from './content/content.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig(process.env.NODE_ENV)),
    ContentModule,
    // TypeOrmModule.forFeature([Sculpture, SculptureMaker]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
