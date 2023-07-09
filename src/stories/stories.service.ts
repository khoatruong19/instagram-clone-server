import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FollowersService } from "src/followers/followers.service";
import { Story } from "src/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StoriesService{
    constructor(@InjectRepository(Story) private readonly storiesRepository: Repository<Story>, private readonly followersService: FollowersService){}


    async getStoriesOfFollowingUsers(currentUserId: number){
        const followingIds = await this.followersService.getFollowedUsersIds(currentUserId)
        return followingIds
    }
}