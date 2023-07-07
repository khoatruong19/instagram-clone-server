import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { CommentLike } from "./CommentLike";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    @JoinColumn()
    author: User

    @Column()
    content: string

    @OneToMany(() => CommentLike, (like) => like.comment,{
        eager: true,
        cascade: true
    })
    likes: CommentLike[]

    likesCount?: number

    @CreateDateColumn({name: "created_at"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
}