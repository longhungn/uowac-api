import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createLike(userId: string, sculptureId: string): Promise<Like> {
    // Uncomment verifyUserExistence() verifySculptureExistence() for more clarification of Foreign key error
    // const { userId, sculptureId } = dtoCreateVisit;
    // await this.verifyUserExistence(userId);
    // await this.verifySculptureExistence(sculptureId);

    const like = await this.manager.create(Like, { userId, sculptureId });
    return await this.manager.save(like);
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

    const likes: Like[] = await this.manager.find(Like, { userId });
    return likes;
  }

  async getLikesBySculptureId(sculptureId: string): Promise<Like[]> {
    await this.verifySculptureExistence(sculptureId);

    const likes: Like[] = await this.manager.find(Like, { sculptureId });
    return likes;
  }

  async deleteLike(likeId: string): Promise<void> {
    const like = await this.getLikeById(likeId);

    await this.manager.remove(like);
  }
}
