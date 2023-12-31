import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class PostImage{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    filename: string

    @ManyToOne(() => Post, post => post.images)
    post: Post
}