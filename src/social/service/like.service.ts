import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';
import { DtoCreateLike } from '../interface/create-like.dto';
import { Like } from '../entity/like.entity';

@Injectable()
export class LikeService {
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

  async checkDuplicateLike(userId, sculptureId): Promise<Like> {
    const like = await this.manager.findOne(Like, {
      userId,
      sculptureId,
    });

    if (like) {
      throw new InternalServerErrorException(
        'You have already liked this sculpture'
      );
    }
    return like;
  }

  async createLike(userId: string, sculptureId: string): Promise<Like> {
    // Uncomment verifyUserExistence() verifySculptureExistence() for more clarification of Foreign key error
    await this.verifyUserExistence(userId);
    await this.verifySculptureExistence(sculptureId);
    await this.checkDuplicateLike(userId, sculptureId);

    const like = await this.manager.create(Like, { userId, sculptureId });
    const result = await this.manager.save(like);

    const extraInfo = await this.manager
      .createQueryBuilder(Like, 'like')
      .select('like')
      .addSelect([
        'user.userId',
        'user.picture',
        'user.name',
        'user.nickname',
        'sculpture.accessionId',
        'sculpture.name',
      ])
      .leftJoin('like.user', 'user')
      .leftJoin('like.sculpture', 'sculpture')
      .leftJoinAndMapMany('sculpture.images', 'sculpture.images', 'image')
      .where('like.likeId = :likeId', { likeId: result.likeId })
      .getOne();

    return { ...result, ...extraInfo };
  }

  async getLikeById(likeId: string): Promise<Like> {
    const like = await this.manager.findOne(Like, { likeId });

    if (!like) {
      throw new NotFoundException(`Like with id ${likeId} does not exits`);
    }

    return like;
  }

  async getLikesByUserId(userId: string): Promise<Like[]> {
    await this.verifyUserExistence(userId);

    const likes = await this.manager
      .createQueryBuilder(Like, 'like')
      .select('like')
      .addSelect([
        'user.userId',
        'user.picture',
        'user.name',
        'user.nickname',
        'sculpture.accessionId',
        'sculpture.name',
      ])
      .leftJoin('like.user', 'user')
      .leftJoin('like.sculpture', 'sculpture')
      .leftJoinAndMapMany('sculpture.images', 'sculpture.images', 'image')
      .where('like.userId = :userId', { userId })
      .getMany();

    return likes;
  }

  async getLikesBySculptureId(sculptureId: string): Promise<Like[]> {
    await this.verifySculptureExistence(sculptureId);

    const likes = await this.manager
      .createQueryBuilder(Like, 'like')
      .select('like')
      .addSelect([
        'user.userId',
        'user.picture',
        'user.name',
        'user.nickname',
        'sculpture.accessionId',
        'sculpture.name',
      ])
      .leftJoin('like.user', 'user')
      .leftJoin('like.sculpture', 'sculpture')
      .leftJoinAndMapMany('sculpture.images', 'sculpture.images', 'image')
      .where('like.sculptureId = :sculptureId', { sculptureId })
      .getMany();

    return likes;
  }

  async deleteLike(likeId: string): Promise<void> {
    const like = await this.getLikeById(likeId);

    await this.manager.remove(like);
  }
}
