import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { DtoCreateComment } from '../interface/create-comment.dto';
import { Comment } from '../entity/comment.entity';
import { DtoUpdateComment } from '../interface/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body() dtoCreateComment: DtoCreateComment
  ): Promise<Comment> {
    return await this.commentService.createComment(dtoCreateComment);
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
  async updateComment(
    @Body() dtoUpdateComment: DtoUpdateComment
  ): Promise<Comment> {
    return await this.commentService.updateComment(dtoUpdateComment);
  }

  @Delete('/:commentId')
  async deleteComment(@Param('commentId') commentId: string): Promise<void> {
    await this.commentService.deleteComment(commentId);
  }
}
