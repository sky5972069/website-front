import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { setContext } from 'apollo-link-context'

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, split
} from '@apollo/client' 
import { onError } from "@apollo/client/link/error"
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
require('dotenv').config();
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const PORT = process.env.PORT || 3001;
console.log(process.env.PORT);
const httpLink = new HttpLink({
    uri: `/graphql`
  })

const link = from([errorLink, httpLink])

const wsLink = new WebSocketLink({
  uri: `ws://localhost:${PORT}/graphql`,
  options: {
    reconnect: true
  }
})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(link),
)


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
    
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  ,
    document.getElementById('root')
  )


