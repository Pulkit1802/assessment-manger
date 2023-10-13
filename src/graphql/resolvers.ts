import { readdirSync } from "fs";
import { join } from "path";

const dirs = readdirSync(join(__dirname, "./resolvers"), {withFileTypes: true})
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name)

const queriesList : object[] = [];
const mutationsList : object[] = [];
const fieldsList : object[] = [];

dirs.forEach((dir) => {
    const {queries} = require(`./resolvers/${dir}/query.ts`);
    const {mutations} = require(`./resolvers/${dir}/mutation.ts`);
    const {fields} = require(`./resolvers/${dir}/fields.ts`);

    queriesList.push(queries);
    mutationsList.push(mutations);
    fieldsList.push(fields);
} )

let Query = {}
let Mutation = {}
let Field = {}

queriesList.forEach((query) => {
    Query = {...Query, ...query}
})

mutationsList.forEach((mutation) => {
    Mutation = {...Mutation, ...mutation}
})

fieldsList.forEach((field) => {
    Field = {...Field, ...field}
})

console.log(Mutation);

const resolvers = {
    Query,
    Mutation,
    ...Field
}

export default resolvers;