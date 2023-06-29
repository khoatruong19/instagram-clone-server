
import {BadRequestException, Injectable} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { hashPassword } from "src/utils/helpers";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

    async createUser(input: CreateUserDto) : Promise<User> {

        const {email, username} = input

        const existingUser = await this.usersRepository.findOne({
            where: [{username}, {email}]
        })

        if(existingUser) throw new BadRequestException("Username or email is already existed! Try another one")

        let user = new User()

        user = {...user, ...input, password: await hashPassword(input.password)}

        return await this.usersRepository.save(user)
    }

    async getUserByUsername(username: string): Promise<User>{
        return await this.usersRepository.findOne({where: {username}})
    }

    async getUserById(id: number): Promise<User>{
        return await this.usersRepository.findOne({where: {id}})
    }
    
}