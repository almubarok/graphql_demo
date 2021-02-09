import fs from 'fs';
import path from 'path';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import * as Query from './graphql/query';
import * as Mutation from './graphql/mutation';
import * as Subscription from './graphql/subscription';
import subquery from './graphql/subquery';
import { createContext } from './context';
import rules from './graphql/rules';

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
);
const resolvers = {
  ...subquery,
  Query,
  Mutation,
  Subscription,
};
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema: applyMiddleware(schema, rules),
  playground: true,
  introspection: true,
  context: createContext,
});

// The `listen` method launches a web server.
server.listen({ port: Number(process.env.PORT) || 5005 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
