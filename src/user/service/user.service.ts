import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { DtoCreateUser } from '../interface/create-user.dto';
import { UniqueConstraintError } from '../../content/error/unique-constraint.error';
import { EntityDoesNotExistError } from '../../content/error/entity-not-exist.error';
import { AuthManagementApi } from '../../auth/auth-management.service';
import { UserStats } from '../entity/user-stats.entity';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async addStatsToUser(user: User) {
    const stats = await this.manager.findOne(UserStats, {
      userId: user.userId,
    });

    const { totalVisits, totalLikes, totalComments } = stats;

    const result = { ...user, totalVisits, totalLikes, totalComments };

    return result;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.manager.find(User, {});
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.manager.findOne(User, { userId });
    if (!user) {
      throw new NotFoundException(`Not Found User with ID: ${userId}`);
    }
    return user;
  }

  async createUser(dtoCreateUser: DtoCreateUser): Promise<User> {
    try {
      await this.getUserById(dtoCreateUser.userId);
    } catch (e) {
      // if not found userId, then userId does not exist in database currently
      const user = this.manager.create(User, dtoCreateUser);
      return await this.manager.save(user);
    }

    // if there is existing userId
    throw new UniqueConstraintError(User, 'userId');
  }

  async deleteUserById(userId: string): Promise<void> {
    const user = await this.getUserById(userId);

    await this.manager.remove(user);
  }

  async updateUser(dtoUpdateUser: DtoCreateUser): Promise<User> {
    const user: User = await this.manager.preload(User, dtoUpdateUser);

    if (!user) {
      throw new EntityDoesNotExistError(
        `User with id ${dtoUpdateUser.userId} does not exist`
      );
    } else {
      return await this.manager.save(user);
    }
  }
}
