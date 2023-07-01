import { Body, ClassSerializerInterceptor, Controller, Get, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { AuthGuardJwt } from "src/common/guards/auth-guard.jwt";
import { AuthGuardLocal } from "src/common/guards/auth-guard.local";
import { User } from "src/typeorm";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('auth')
@SerializeOptions({
    strategy: 'exposeAll'
  })
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
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@CurrentUser() user: User | null){
        const token = this.authService.getTokenForUser(user)
        return {
            user, token
        }
    }

    @Get('me')
    @UseGuards(AuthGuardJwt)
    async me(@CurrentUser() user: User | null){
        return user
    }
}