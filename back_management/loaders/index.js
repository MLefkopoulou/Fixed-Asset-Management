'use strict';
const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const graphqlLoader = require('./graphql');

async function loadServer(expressApp){

  // TODO: Errors?
  await expressLoader(expressApp);
  console.log('* Express loaded');
  await mongooseLoader();
  console.log('* Mongoose loaded');
  const httpServer = await graphqlLoader(expressApp);
  console.log('* GraphQL loaded');

  return httpServer;
}
module.exports = loadServer