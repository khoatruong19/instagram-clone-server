import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { PostLike } from "./PostLike";
import { PostImage } from "./PostImage";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    caption: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    author: User

    @OneToMany(() => PostLike, (like) => like.post,{
        eager: true,
        cascade: true
    })
    likes: PostLike[]

    likesCount?: number

    @OneToMany(() => PostImage, (image) => image.post,{
        eager: true,
        cascade: true
    })
    images: PostImage[]

    @CreateDateColumn({name: "created_at"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
}