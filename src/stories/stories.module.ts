import { Module } from "@nestjs/common";
import { StoriesController } from "./stories.controller";
import { StoriesService } from "./stories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follower, Story } from "src/typeorm";
import { FollowersService } from "src/followers/followers.service";
import { FollowersModule } from "src/followers/followers.module";

@Module({
    imports: [TypeOrmModule.forFeature([Follower,Story]), FollowersModule],
    controllers: [StoriesController],
    providers: [FollowersService, StoriesService]
})
export class StoriesModule{

}