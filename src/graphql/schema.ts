import { join } from "path";
import { readFileSync, readdirSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schemaDir = readdirSync(join(__dirname, "./schemas"))

let typeDefString = '';

schemaDir.forEach((file) => {
    typeDefString += readFileSync(join(__dirname, `./schemas/${file}`), "utf-8");
});

const typeDefs = makeExecutableSchema({
    typeDefs: typeDefString,
})

export default typeDefs;