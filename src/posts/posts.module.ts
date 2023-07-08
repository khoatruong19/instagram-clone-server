import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post, PostImage } from "src/typeorm";
import { PostsService } from "./posts.service";
import {MulterModule} from "@nestjs/platform-express"

@Module({
    imports:[TypeOrmModule.forFeature([Post, PostImage]), MulterModule.registerAsync({
        useFactory: () => ({
          dest: './upload',
        }),
      })],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule{}