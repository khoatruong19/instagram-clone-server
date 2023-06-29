/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    load: [ormConfig],
    expandVariables: true,
    envFilePath: `${process.env.NODE_ENV ?? ""}.env`
  }),
  TypeOrmModule.forRootAsync({
    useFactory: ormConfig
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
