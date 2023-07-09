import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import { UserService } from "../../auth/user.service";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(private readonly usersService: UserService, private readonly cacheService: RedisService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_SECRET,
        })
    }

    //add redis later
    async validate(payload: any): Promise<any> {
        await this.cacheService.set("test", "khoa")
        return await this.usersService.getUserById(payload.sub)
    }

}