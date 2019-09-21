import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from '../service/like.service';
import { DtoCreateLike } from '../interface/create-like.dto';
import { Like } from '../entity/like.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserParam } from '../../auth/user.decorator';
import { AuthUser } from '../../auth/auth-user.interface';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createLike(
    @Body() dtoCreateLike: DtoCreateLike,
    @UserParam() user: AuthUser
  ): Promise<Like> {
    return await this.likeService.createLike(
      user.userId,
      dtoCreateLike.sculptureId
    );
  }

  @Get('/:likeId')
  async getLikeById(@Param('likeId') likeId: string): Promise<Like> {
    return await this.likeService.getLikeById(likeId);
  }

  @Get('/user-id/:userId')
  async getLikesByUserId(@Param('userId') userId: string): Promise<Like[]> {
    return await this.likeService.getLikesByUserId(userId);
  }

  @Get('/sculpture-id/:sculptureId')
  async getLikesBySculptureId(
    @Param('sculptureId') sculptureId: string
  ): Promise<Like[]> {
    return await this.likeService.getLikesBySculptureId(sculptureId);
  }

  @Delete(':likeId')
  async deleteLike(@Param('likeId') likeId: string): Promise<void> {
    await this.likeService.deleteLike(likeId);
  }
}