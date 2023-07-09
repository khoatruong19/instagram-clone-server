import { Multer } from "multer"

export class CreateStoryData{
    authorId: number
    files: Array<Express.Multer.File>
}