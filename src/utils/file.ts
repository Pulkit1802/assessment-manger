import multer from "multer";
import { filePath } from "../config";

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, filePath)
        },
        filename: function (req, file, cb) {
            let uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '_' + file.originalname)
        }
    }),
})

export default fileUpload;