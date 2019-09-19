import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { VisitController } from './controller/visit.controller';
import { VisitService } from './service/visit.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CommentController, VisitController],
  providers: [CommentService, VisitService],
})
export class SocialModule {}
