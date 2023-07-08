import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import * as path from "path";
import {v4 as uuidv4} from "uuid"


interface StorageValidation{
    fileFilter: MulterOptions
}

export const storage = diskStorage({
    destination: "./upload",
    filename:(req, file, cb) => {
        console.log([file])
        
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext

        cb(null, `${filename}${extension}`)
    },
})

const maxSize = 1*1024*1024 //1MB
export const storageOptions: MulterOptions = {
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" ){
            return cb(new BadRequestException("Only .png, .jpg and .jpeg format allowed!"), false)
        }
        cb(null, true)
    },
    limits: {fileSize: maxSize}
}
