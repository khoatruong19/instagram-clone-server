import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number 

    @Column({nullable: true, name: "profile_photo"})
    profilePhoto?: string

    @Column({type: 'longtext'})
    bio: string

    @Column({nullable: true})
    gender: string 
    
    @Column({default: true, name: "is_suggested"})
    isSuggested: boolean
}