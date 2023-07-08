import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post, PostImage } from "src/typeorm";
import { PostService } from "./post.service";
import {MulterModule} from "@nestjs/platform-express"

@Module({
    imports:[TypeOrmModule.forFeature([Post, PostImage]), MulterModule.registerAsync({
        useFactory: () => ({
          dest: './upload',
        }),
      })],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule{}