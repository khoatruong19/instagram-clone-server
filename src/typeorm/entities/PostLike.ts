import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { LikeAbstract } from "src/utils/abstracts/LikeAbstract";

@Entity()
export class PostLike extends LikeAbstract{
    @ManyToOne(() => Post, post => post.likes)
    post: Post
}