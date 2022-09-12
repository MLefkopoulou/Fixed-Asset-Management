import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak.js'
import { BrowserRouter } from 'react-router-dom';
import {ApolloProvider,ApolloClient, InMemoryCache, split, ApolloLink} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import store from './redux/store'


// graphql base api link for http requests (+ file uploads)
const httpLink = createUploadLink({
  uri: 'http://localhost:4444/graphql',
});

//subscriptions link
const wsLink = new  GraphQLWsLink ({
  uri: 'ws://localhost:4444/subscriptions',
  options: {
    reconnect: true
  }
});

// middleware for attaching the token to every graphql request 
const middleware = new ApolloLink((operation, forward) => {

  let token = store.getState().token;
  operation.setContext({
  
    headers: {
      authorization: token!=="" ? `Bearer ${token}` : "" 
    }
  });

return forward(operation);
});

// The split function:
//
// If the query is a subscription -> socket requests
// For mutations and simple queries -> http requests
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    let token = store.getState().token
    let message;
    if (token !== '') message = ' | Token OK';
    else message = ' | Token => No Token';
    console.log("message",message);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
   link: middleware.concat(splitLink),
   cache: new InMemoryCache({
      addTypename: false
  }),
  cors:{
    origin: '*',
    credentials: true
  },
  fetchOptions: {
    mode: 'no-cors',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
});

 const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <ApolloProvider client = {client}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ApolloProvider>
   </ReactKeycloakProvider>




);

