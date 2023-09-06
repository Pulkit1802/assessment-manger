import { ApolloServer } from "@apollo/server";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import { BaseContext } from "@apollo/server";
import { typeDefs, resolvers } from "../graphql";
import { Server } from "http";
import logger from "../utils/logger";
import configs from "../config/config";

export const buildApolloServer = async (httpServer: Server, serverOptions?: BaseContext): Promise<ApolloServer> => {

    try {
        
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: configs.env === "dev" ? true : false,
            plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
            ...serverOptions
        });

        return server

    } catch (error) {
        logger.error("Failed to build Apollo Server \n", error);
        process.exit(1);
    }

};