import { Request, Response, NextFunction } from "express";
import multer from "multer";

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        // @ts-ignore
        filename: function (req, file, cb) {
            let uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '_' + file.originalname)
        }
    }),
})

export default fileUpload;