import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import { UserService } from "../../auth/user.service";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(private readonly usersService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_SECRET,
        })
    }

    //add redis later
    async validate(payload: any): Promise<any> {
        return await this.usersService.getUserById(payload.sub)
    }

}