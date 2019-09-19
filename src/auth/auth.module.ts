import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ScopesGuard } from './scopes.guard';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [JwtStrategy, ScopesGuard],
  exports: [PassportModule, ScopesGuard],
})
export class AuthModule {}
