import { readdirSync } from "fs";

const dirs = readdirSync(__dirname+'./resolvers', {withFileTypes: true})
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name)

const queriesList : object[] = [];
const mutationsList : object[] = [];
const fieldsList : object[] = [];

dirs.forEach((dir) => {
    const {queries} = require(`./${dir}/querry.ts`);
    const {mutations} = require(`./${dir}/mutation.ts`);
    const {fields} = require(`./${dir}/fields.ts`);
    console.log(fields);
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

console.log(Field);

const resolvers = {
    Query,
    Mutation,
    ...Field
}

export default resolvers;