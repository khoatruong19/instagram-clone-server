import { Length } from "class-validator";

export class CreatePostDto{

    @Length(10)
    caption: string

    
}