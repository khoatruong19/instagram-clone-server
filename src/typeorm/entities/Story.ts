import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Story{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.stories)
    @JoinColumn()
    author: User

    @Column()
    url: string

    @Column()
    filename: string

    @Column({default: false})
    isExpired: boolean

    @CreateDateColumn({name: "created_at"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
}