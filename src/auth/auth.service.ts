
import { Injectable } from "@nestjs/common";
import { User } from "src/typeorm";
import { compareHash } from "src/utils/helpers";
import { UserService } from "./user.service";
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthService{
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService){}

    async validateUser(username: string, password: string) : Promise<User | null>{
        const user = await this.usersService.getUserByUsername(username)

        if(!user) return null

        const comparePasswordRel = await compareHash(password, user.password)

        if(!comparePasswordRel) return null

        return user
    }

    getTokenForUser(user: User) : string {
        return this.jwtService.sign({
            username: user.username,
            sub: user.id
        })
    }
    
}