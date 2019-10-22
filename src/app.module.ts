import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './utils/getOrmConfig';
import { ContentModule } from './content/content.module';
import { SocialModule } from './social/social.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
/**
 * Application root
 *
 * Imports all other modules and serve as entry point
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig(process.env.NODE_ENV)),
    ContentModule,
    SocialModule,
    UserModule,
    // TypeOrmModule.forFeature([Sculpture, SculptureMaker]),
    AuthModule,
  ],
})
export class AppModule {}
