import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../common/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/strategies/jwt.stategy';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: 24 * 60 * 60,
        },
      }),
    }),
    RedisModule
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
