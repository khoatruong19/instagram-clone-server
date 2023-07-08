import { IsOptional } from "class-validator";

export class UpdatePostDto{
    @IsOptional()
    caption: string
}