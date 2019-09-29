import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ScopesGuard } from './scopes.guard';
import { AuthManagementApi } from './auth-management.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [JwtStrategy, ScopesGuard, AuthManagementApi],
  exports: [PassportModule, ScopesGuard, AuthManagementApi],
})
export class AuthModule {}
