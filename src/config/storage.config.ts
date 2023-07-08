import { diskStorage } from "multer";
import * as path from "path";
import {v4 as uuidv4} from "uuid"

export const storage = diskStorage({
    destination: "./upload",
    filename:(req, file, cb) => {
        console.log([file])
        
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext

        cb(null, `${filename}${extension}`)
    }
})