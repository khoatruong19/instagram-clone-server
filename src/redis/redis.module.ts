import { CacheStore, Module, CacheModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: await redisStore({
          url: configService.get('REDIS_URL'),
          ttl: 5000,
        }) as unknown as CacheStore,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
