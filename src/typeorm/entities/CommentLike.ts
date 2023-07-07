import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { LikeAbstract } from "src/utils/abstracts/LikeAbstract";
import { Comment } from "./Comment";

@Entity()
export class CommentLike extends LikeAbstract{
    @ManyToOne(() => Comment, comment => comment.likes)
    comment: Comment
}