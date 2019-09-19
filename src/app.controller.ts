import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ScopesGuard } from './auth/scopes.guard';
import { Scopes } from './auth/scopes.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //TODO: this route is for testing, delete
  @Get('create-user-rule')
  @UseGuards(AuthGuard(), ScopesGuard)
  @Scopes('create:user')
  testAuth(@Req() req) {
    return req.user;
  }
}
