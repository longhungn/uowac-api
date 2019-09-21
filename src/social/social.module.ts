import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { VisitController } from './controller/visit.controller';
import { VisitService } from './service/visit.service';
import { AuthModule } from '../auth/auth.module';
import { LikeController } from './controller/like.controller';
import { LikeService } from './service/like.service';

@Module({
  imports: [AuthModule],
  controllers: [CommentController, VisitController, LikeController],
  providers: [CommentService, VisitService, LikeService],
})
export class SocialModule {}
