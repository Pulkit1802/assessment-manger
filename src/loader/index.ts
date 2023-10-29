import { expressMiddleware } from "@apollo/server/express4"
import { Application, json, Request, Response, NextFunction } from "express";
import http, { Server } from "http";
import { buildApolloServer } from "./apolloServer";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
// import configs from "../config";
import logger from "../utils/logger";
import handleFileIfAny from "../utils/file";

export default async ( { app }: { app: Application } ) : Promise<Server> => {

    try {

        const corsOptions = {
            origin: ["https://studio.apollographql.com", "http://localhost:3000"],
            credentials: true,
        }
    
        // app.use(morgan(`${configs.env === "dev" ? "dev" : "tiny"}`));
        app.use(helmet());
        app.use(cors(corsOptions));
        app.use(json());
    
        app.get('/healthCheck', (req, res) => {
            try {
                
                res.status(200).json({
                    message: "Server is running",
                    uptime: process.uptime(),
                });
    
            } catch (error) {
                logger.error("Failed to check server health \n", error);
            
                res.status(500).json({
                    message: "Not OK",
                });
            }
            
        });

        const server: Server = http.createServer(app);

        const apolloServer = await buildApolloServer(server);
        await apolloServer.start();

        app.use('/file', handleFileIfAny.single('file'), (req: Request, res: Response, next: NextFunction) => {
            try {
                const {file} = req;
                if (!file) throw new Error("No file found");
                res.status(200).json({
                    message: "File uploaded successfully",
                    file: file.filename,
                });
            } catch (e) {
                logger.error("Failed to upload file \n", e);
                res.status(500).json({
                    message: "Failed to upload file",
                });
            }
        })
        app.use('/graphql', expressMiddleware(apolloServer));

        return server;

    } catch (error) {
        logger.error("Failed to build Apollo Server \n", error);
        process.exit(1);
    }

}