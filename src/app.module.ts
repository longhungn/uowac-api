import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './utils/getOrmConfig';
import { ContentModule } from './content/content.module';
import { SocialModule } from './social/social.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig(process.env.NODE_ENV)),
    ContentModule,
    SocialModule,
    UserModule,
    // TypeOrmModule.forFeature([Sculpture, SculptureMaker]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
