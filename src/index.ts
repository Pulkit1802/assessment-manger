import { Server } from "http";
import express, {Application} from "express";
import loader from "./loader";
import logger from "./utils/logger";
import configs from "./config";

process.on("uncaughtException", (error) => {
    logger.warn("Uncaught Exception: \n", error);
    process.exit(1);
});

const app: Application = express();

let server: Server;
loader({ app }).then((app) => {
    server = app.listen(configs.port, () => {
        logger.info(`Server is running on port ${configs.port}`);
    }
)}).catch((error) => {
    logger.error("Failed to start server \n", error);
    process.exit(1);
});

process.on("SIGINT", () => {
    logger.warn("SIGINT signal received");
    server.close(() => {
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    logger.warn("SIGTERM signal received");
    server.close(() => {
        process.exit(0);
    });
});