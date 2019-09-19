import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Timestamp } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { DtoCreateComment } from '../interface/create-comment.dto';
import { User } from '../../user/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';
import { DtoUpdateComment } from '../interface/update-comment.dto';
import { EntityDoesNotExistError } from '../../content/error/entity-not-exist.error';

@Injectable()
export class CommentService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async verifyUserExistence(userId: string): Promise<User> {
    const user = await this.manager.findOne(User, { userId });

    if (!user) {
      throw new NotFoundException(`There is no user with id ${userId}`);
    }

    return user;
  }

  async verifySculptureExistence(sculptureId: string): Promise<Sculpture> {
    const sculpture = await this.manager.findOne(Sculpture, {
      accessionId: sculptureId,
    });

    if (!sculpture) {
      throw new NotFoundException(
        `There is no sculpture with id ${sculptureId}`
      );
    }

    return sculpture;
  }

  async createComment(
    userId: string,
    sculptureId: string,
    content: string
  ): Promise<Comment> {
    // Uncomment verifyUserExistence() verifySculptureExistence() for more clarification of Foreign key error

    // await this.verifyUserExistence(userId);
    // await this.verifySculptureExistence(sculptureId);

    const comment = await this.manager.create(Comment, {
      userId,
      sculptureId,
      content,
    });
    return await this.manager.save(comment);
  }

  async getCommentById(commentId: string): Promise<Comment> {
    const comment = await this.manager.findOne(Comment, { commentId });

    if (!comment) {
      throw new NotFoundException(`Not found comment with id ${commentId}`);
    }

    return comment;
  }

  async getCommentsByUserId(userId: string): Promise<Comment[]> {
    await this.verifyUserExistence(userId);

    const comments: Comment[] = await this.manager.find(Comment, { userId });

    return comments;
  }

  async getCommentsBySculptureId(sculptureId: string): Promise<Comment[]> {
    await this.verifySculptureExistence(sculptureId);

    const comments: Comment[] = await this.manager.find(Comment, {
      sculptureId,
    });

    return comments;
  }

  async updateComment(
    userId: string,
    commentId: string,
    content: string
  ): Promise<Comment> {
    const comment: Comment = await this.manager.preload(Comment, {
      commentId,
      userId,
      content,
    });

    if (!comment) {
      throw new EntityDoesNotExistError(
        `Comment with id ${commentId} does not exist`
      );
    }

    return await this.manager.save(comment);
  }

  async deleteComment(commentId: string): Promise<void> {
    const comment = await this.getCommentById(commentId);
    await this.manager.remove(comment);
  }
}
