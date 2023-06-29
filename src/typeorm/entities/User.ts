import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Profile } from './Profile';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    @Exclude()
    password: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({name: "full_name"})
    fullName: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
  
}
  