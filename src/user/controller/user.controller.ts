import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { DtoCreateUser } from '../interface/create-user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { EntityDoesNotExistError } from '../../content/error/entity-not-exist.error';
import { AuthGuard } from '@nestjs/passport';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() dtoCreateUser: DtoCreateUser): Promise<User> {
    return await this.userService.createUser(dtoCreateUser);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUserById(id);
  }

  @Patch()
  async updateUser(@Body() dtoUpdateUser: DtoCreateUser): Promise<User> {
    return await this.userService.updateUser(dtoUpdateUser);
  }

  @Post('sync')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('create:user')
  async syncUser(@Body() data: DtoCreateUser) {
    let user: User;
    try {
      user = await this.userService.updateUser(data);
    } catch (err) {
      if (err instanceof EntityDoesNotExistError) {
        user = await this.userService.createUser(data);
      } else {
        throw err;
      }
    }

    this.logger.log(`Synced user with id ${user.userId}`);
    return user;
  }
}
