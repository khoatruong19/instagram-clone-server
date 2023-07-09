import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Follower{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn({name: "follower_user_id"})
    followerUser: User

    @OneToOne(() => User)
    @JoinColumn({name: "followed_user_id"})
    followedUser: User
}