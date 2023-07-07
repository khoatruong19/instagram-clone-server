import { User } from "src/typeorm";
import { Post } from "src/typeorm/entities/Post";
import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class LikeAbstract{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    user: User

    @CreateDateColumn({name: "created_at"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
}