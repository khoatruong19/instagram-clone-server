import { LikeAbstract } from "src/utils/abstracts/LikeAbstract";
import { Entity, ManyToOne } from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class CommentLike extends LikeAbstract{
    @ManyToOne(() => Comment, comment => comment.likes)
    comment: Comment
}