import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follower } from "src/typeorm";
import { FollowersService } from "./followers.service";


@Module({
    imports: [TypeOrmModule.forFeature([Follower])],
    providers: [FollowersService],
    exports: [FollowersService]
})
export class FollowersModule{}