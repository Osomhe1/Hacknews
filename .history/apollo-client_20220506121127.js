// import { ApolloClient, InMemoryCache } from '@apollo/client'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from './constants' 
import * as ws from 'ws'
import { split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
// import { useEffect } from 'react'
import Cookies from 'js-cookie'
// import ws from 'ws'





const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(AUTH_TOKEN)
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
      authToken: Cookies.get(AUTH_TOKEN),
    },
  },
  webSocketImpl: ws,
})

const link =   split(
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
