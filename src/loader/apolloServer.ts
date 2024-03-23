import { ApolloServer } from "@apollo/server";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import { BaseContext } from "@apollo/server";
import { typeDefs, resolvers } from "../graphql";
import { Server } from "http";
import logger from "../utils/logger";
import configs from "../config";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../middlewares/permissions";
import { makeExecutableSchema } from "@graphql-tools/schema";


export const buildApolloServer = async (httpServer: Server, serverOptions?: BaseContext): Promise<ApolloServer> => {

    try {
        
        const server = new ApolloServer({
            // schema: applyMiddleware(
            //     makeExecutableSchema({typeDefs, resolvers}), 
            //     permissions
            // ),
            typeDefs,
            resolvers,
            introspection:  true,
            plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
            ...serverOptions
        });

        return server

    } catch (error) {
        logger.error("Failed to build Apollo Server \n", error);
        process.exit(1);
    }

};