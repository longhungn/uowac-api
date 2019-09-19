import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { DtoCreateComment } from '../interface/create-comment.dto';
import { Comment } from '../entity/comment.entity';
import { DtoUpdateComment } from '../interface/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserParam } from '../../auth/user.decorator';
import { AuthUser } from '../../auth/auth-user.interface';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createComment(
    @Body() data: DtoCreateComment,
    @UserParam() user: AuthUser
  ): Promise<Comment> {
    return await this.commentService.createComment(
      user.userId,
      data.sculptureId,
      data.content
    );
  }

  @Get('/:commentId')
  async getCommentById(
    @Param('commentId') commentId: string
  ): Promise<Comment> {
    return await this.commentService.getCommentById(commentId);
  }

  @Get('/sculpture-id/:sculptureId')
  async getCommentsBySculptureId(
    @Param('sculptureId') sculptureId: string
  ): Promise<Comment[]> {
    return await this.commentService.getCommentsBySculptureId(sculptureId);
  }

  @Get('/user-id/:userId')
  async getCommentsByUserId(
    @Param('userId') userId: string
  ): Promise<Comment[]> {
    return await this.commentService.getCommentsByUserId(userId);
  }

  @Patch()
  @UseGuards(AuthGuard())
  async updateComment(
    @Body() data: DtoUpdateComment,
    @UserParam() user: AuthUser
  ): Promise<Comment> {
    return await this.commentService.updateComment(
      user.userId,
      data.commentId,
      data.content
    );
  }

  @Delete('/:commentId')
  async deleteComment(@Param('commentId') commentId: string): Promise<void> {
    await this.commentService.deleteComment(commentId);
  }
}
