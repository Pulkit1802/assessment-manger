import { Router } from "express";
import fileUpload from "../middlewares/file";
import { fileController } from "../controllers";

const router = Router();

router.route('/')
    .get(fileController.sendFile)
    .post(fileUpload.single('file'), fileController.fileUpload)

export default router;