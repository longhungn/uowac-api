import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { DtoCreateComment } from '../interface/create-comment.dto';
import { User } from '../../user/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';
import { DtoUpdateComment } from '../interface/update-comment.dto';
import { EntityDoesNotExistError } from '../../content/error/entity-not-exist.error';
import { SculptureImage } from '../../content/entity/image.entity';
import { DtoPagination } from '../interface/pagination.dto';
/**
 * Service class to handle all logic for creating, reading,
 * updating and deleting comments
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
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
    const result = await this.manager.save(comment);
    const extraInfo = await this.manager
      .createQueryBuilder(Comment, 'comment')
      .select('comment')
      .addSelect([
        'user.userId',
        'user.picture',
        'user.name',
        'user.nickname',
        'sculpture.accessionId',
        'sculpture.name',
      ])
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.sculpture', 'sculpture')
      .leftJoinAndMapMany('sculpture.images', 'sculpture.images', 'image')
      .where('comment.commentId = :commentId', { commentId: result.commentId })
      .getOne();

    return { ...result, ...extraInfo };
  }

  async getCommentById(commentId: string): Promise<Comment> {
    const comment = await this.manager.findOne(Comment, { commentId });

    if (!comment) {
      throw new NotFoundException(`Not found comment with id ${commentId}`);
    }

    return comment;
  }

  /**
   * Baseline query to get comment and related sculpture, user
   * To be extended (by adding filter conditions) in other methods
   * @param pagination
   */
  async commentQueryBuilder(pagination?: DtoPagination) {
    let query = await this.manager
      .createQueryBuilder(Comment, 'comment')
      .select([
        'comment.content',
        'comment.commentId',
        'comment.createdTime',
        'comment.updatedTime',
      ])
      .addSelect([
        'user.userId',
        'user.picture',
        'user.name',
        'user.nickname',
        'sculpture.accessionId',
        'sculpture.name',
      ])
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.sculpture', 'sculpture')
      .leftJoinAndMapMany('sculpture.images', 'sculpture.images', 'image')
      .orderBy('comment.createdTime', 'DESC');

    if (pagination) {
      const { after, before, limit } = pagination;

      // add offset if offset was specified
      if (after) {
        query = query
          .where(
            '(comment.createdTime, comment.commentId) < (SELECT "createdTime", "commentId" FROM "comment" WHERE "commentId" = :lastId)',
            { lastId: after }
          )
          .orderBy('comment.createdTime', 'DESC')
          .addOrderBy('comment.commentId', 'DESC');
      } else if (before) {
        query = query
          .where(
            '(comment.createdTime, comment.commentId) > (SELECT "createdTime", "commentId" FROM "comment" WHERE "commentId" = :lastId)',
            { lastId: before }
          )
          .orderBy('comment.createdTime', 'ASC')
          .addOrderBy('comment.commentId', 'ASC');
      }

      //add limit if limit was specified
      if (limit) {
        query = query.take(limit);
      }
    }
    return query;
  }

  async getAllComments(): Promise<Comment[]> {
    const query = await this.commentQueryBuilder();
    const comments = await query.getMany();

    return comments;
  }

  async getCommentsByUserId(
    userId: string,
    pagination?: DtoPagination
  ): Promise<Comment[]> {
    await this.verifyUserExistence(userId);

    const query = await this.commentQueryBuilder(pagination);
    const comments = await query
      .andWhere('comment.userId = :userId', { userId })
      .getMany();

    return comments;
  }

  async getCommentsBySculptureId(
    sculptureId: string,
    pagination?: DtoPagination
  ): Promise<Comment[]> {
    await this.verifySculptureExistence(sculptureId);

    //filter comments for this sculpture only
    let query = await this.commentQueryBuilder(pagination);
    query = query.andWhere('comment.sculptureId = :sculptureId', {
      sculptureId,
    });

    let comments = await query.getMany(); //retrieve results
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
