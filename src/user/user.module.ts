import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { AuthModule } from '../auth/auth.module';
import { ContentModule } from '../content/content.module';
/**
 * Module containing user related features
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
@Module({
  imports: [AuthModule, ContentModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
