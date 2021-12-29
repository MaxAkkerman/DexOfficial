import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import Radiance from '../extensions/Radiance.json';

const httpLink = new HttpLink({
  uri: Radiance.networks[2].graphqlUrl,
});

const wsLink = new WebSocketLink({
  options: {
    reconnect: true,
  },
  uri: Radiance.networks[2].graphqlUrlWs,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
