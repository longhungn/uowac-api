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
    TypeOrmModule.forRoot({
      name: 'development',
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'uowac_dev',
      entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
      synchronize: false,
      logging: true,
      logger: 'file',
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        // Location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: 'src/migrations',
      },
    }),
    // TypeOrmModule.forFeature([Sculpture, SculptureMaker]),
  ],
  controllers: [AppController],
  providers: [AppService, SculptureService],
})
export class AppModule {}
