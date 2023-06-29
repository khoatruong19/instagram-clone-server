import {Controller, Get, Post,Body, Request, UseGuards} from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { AuthGuardLocal } from "src/common/guards/auth-guard.local";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/typeorm";
import { AuthGuardJwt } from "src/common/guards/auth-guard.jwt";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly usersService: UserService, private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() createUserInput: CreateUserDto){
        const user = await this.usersService.createUser(createUserInput)
        return {
            user, token: this.authService.getTokenForUser(user)
        }
    }

    @Post('login')
    @UseGuards(AuthGuardLocal)
    async login(@CurrentUser() user: User | null){
        return {
            user, token: this.authService.getTokenForUser(user)
        }
    }
   
}