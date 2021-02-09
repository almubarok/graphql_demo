import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import * as Query from './graphql/query';
import * as Mutation from './graphql/mutation';
import * as Subscription from './graphql/subscription';
import subquery from './graphql/subquery';
import { createContext } from './context';

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const server = new ApolloServer({
  typeDefs: schema,
  playground: true,
  introspection: true,
  resolvers: {
    ...subquery,
    Query,
    Mutation,
    Subscription,
  },
  context: createContext,
});

// The `listen` method launches a web server.
server.listen({ port: Number(process.env.PORT) || 5005 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
