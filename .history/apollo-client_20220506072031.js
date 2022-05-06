// import { ApolloClient, InMemoryCache } from '@apollo/client'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from './constants' 

import { split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'



const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
  const token = if (typeof window !== 'undefined') {
  // Perform localStorage action
  const item = localStorage.getItem('key')
}
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// })

// web sokect link

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: window.localStorage.getItem(AUTH_TOKEN),
    },
  },
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})



export default client
