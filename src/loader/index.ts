import { expressMiddleware } from "@apollo/server/express4"
import { Application, json, Request, Response, NextFunction } from "express";
import { buildApolloServer } from "./apolloServer";
import http from "http";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import configs from "../config";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import router from "../routes";

export default async ( { app }: { app: Application } ) : Promise<http.Server> => {

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

        const server: http.Server = http.createServer(app);

        const apolloServer = await buildApolloServer(server);
        await apolloServer.start();

        app.use('/api', router);
        app.use('/graphql', expressMiddleware(apolloServer, {context: async ({req}) => {
            const token = req.headers.authorization || '';
            if (token === '' || !token)
                return { user: null };

            const user = jwt.verify(token.split(' ')[1], configs.secret);
            return { user };
        }}));

        app.use('*', (req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                message: "Invalid Path",
            });
        });

        return server;

    } catch (error) {
        logger.error("Failed to build Apollo Server \n", error);
        process.exit(1);
    }

}