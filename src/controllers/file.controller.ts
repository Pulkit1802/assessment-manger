import { Request, Response, NextFunction } from "express";
import { filePath } from "../config";
import { existsSync } from "fs";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/apiError";

const fileUpload = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    // console.log(file)
    if (!file)
        throw new ApiError(400, "No file uploaded");
    res.status(200).json({
        message: "File uploaded successfully",
        file
    });
});

const sendFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check if file exists in directory
    // console.log("hello")
    const { fileName } = req.query;
    console.log(req.query, req.params)
    if (!fileName)
        throw new ApiError(400, "File name not provided");
    
    if(!existsSync(filePath + fileName))
        throw new ApiError(404, "File not found");
    res.status(200).sendFile(filePath + fileName);
});

export default {
    sendFile,
    fileUpload
}