import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class PostService{
    constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>){}

    async getAllPosts(): Promise<Post[]>{
        return this.postsRepository.find()
    }
}