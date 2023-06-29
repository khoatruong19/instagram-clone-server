import {Length,IsEmail } from "class-validator";

export class CreateUserDto{
    @Length(8)
    username: string;
  
    @Length(6)
    password: string;
  
    @IsEmail()
    email: string;
  
    @Length(10)
    fullName: string;
}