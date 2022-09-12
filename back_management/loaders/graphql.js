'use strict';
const http = require('http');

const ApolloServer = require('apollo-server-express').ApolloServer;
const typeDefs = require('../graphql/schemas/schemas');
const resolvers = require('../graphql/resolvers/resolverls');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} =require("apollo-server-core");
const cors = require("cors");

module.exports = async (app) => {

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
      subscriptions: {
        path: '/subscriptions'
      },
      context: async ({ req, res }) => {
        return { req, res };
      },
    });
    app.use(cors());

    
    await server.start();
    server.applyMiddleware({ app});

    return httpServer;
};

