import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { AuthGuardJwt } from "src/common/guards/auth-guard.jwt";
import { FollowersService } from "src/followers/followers.service";
import { User } from "src/typeorm";

@Controller("stories")
export class StoriesController{
    constructor(private readonly followersService: FollowersService){}


    @Get()
    @UseGuards(AuthGuardJwt)
    getStoriesOfFollowingUsers(@CurrentUser() user: User){
        return this.followersService.getFollowedUsersIds(user.id)
    }

}