import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { DtoCreateComment } from '../interface/create-comment.dto';
import { Comment } from '../entity/comment.entity';
import { DtoUpdateComment } from '../interface/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserParam } from '../../auth/user.decorator';
import { AuthUser } from '../../auth/auth-user.interface';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';

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

  @Get('/')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:analytics')
  async getAllComments(): Promise<Comment[]> {
    return await this.commentService.getAllComments();
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
  @UseGuards(AuthGuard())
  async deleteComment(
    @Param('commentId') commentId: string,
    @UserParam() user: AuthUser
  ): Promise<void> {
    const comment = await this.commentService.getCommentById(commentId);
    if (
      comment.userId != user.userId &&
      !user.scope.includes('delete:all_comment')
    ) {
      throw new ForbiddenException('You cannot delete this comment');
    }
    await this.commentService.deleteComment(commentId);
  }
}
