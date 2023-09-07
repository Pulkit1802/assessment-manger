import { GraphQLScalarType, Kind } from "graphql";

const dateScaler = new GraphQLScalarType({
    name: "Date",
})