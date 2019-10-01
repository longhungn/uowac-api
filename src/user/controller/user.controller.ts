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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DtoCreateUser } from '../interface/create-user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { EntityDoesNotExistError } from '../../content/error/entity-not-exist.error';
import { AuthGuard } from '@nestjs/passport';
import { ScopesGuard } from '../../auth/scopes.guard';
import { Scopes } from '../../auth/scopes.decorator';
import { AuthUser } from '../../auth/auth-user.interface';
import { UserParam } from '../../auth/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { IMulterUploadedFile } from '../../content/interface/multer-uploaded-file.interface';
import { DtoUpdateUser } from '../interface/update-user.dto';
import { PictureUploader } from '../../content/service/picture-uploader.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  private readonly picUploader = new PictureUploader(
    process.env.AWS_S3_PROFILE_PIC_BUCKET_NAME
  );

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('view:all_users')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async getMyUser(@UserParam() user: AuthUser) {
    return await this.userService.getUserById(user.userId);
  }

  @Patch('me')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('picture'))
  async updateMyProfile(
    @UploadedFile() picture: IMulterUploadedFile,
    @Body() body: DtoUpdateUser,
    @UserParam() userParam: AuthUser
  ) {
    const user: User = await this.userService.getUserById(userParam.userId);
    let picUrl: string = user.picture;

    //check if a picture file was sent
    if (picture) {
      //check if past profile pic is in S3
      if (user.picture.includes('amazonaws.com')) {
        await this.picUploader.deleteImageFromS3url(user.picture);
      }

      if (user.provider === 'auth0') {
        //Upload new pic
        //prettier-ignore
        let fileName = `${user.userId}/${Date.now().toString()}-${picture.originalname}`;
        fileName = fileName.replace('|', '%7C'); //escape url string
        picUrl = await this.picUploader.uploadImageToS3(picture, fileName);
      }
    }

    const data: DtoCreateUser = {
      userId: userParam.userId,
      ...body,
      picture: picUrl,
    };
    return await this.userService.updateUser(data);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  // @Post()
  // async createUser(@Body() dtoCreateUser: DtoCreateUser): Promise<User> {
  //   return await this.userService.createUser(dtoCreateUser);
  // }

  // @Delete('/:id')
  // async deleteUserById(@Param('id') id: string): Promise<void> {
  //   await this.userService.deleteUserById(id);
  // }

  // @Patch()
  // async updateUser(@Body() dtoUpdateUser: DtoCreateUser): Promise<User> {
  //   return await this.userService.updateUser(dtoUpdateUser);
  // }

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
