/* eslint-disable no-underscore-dangle */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { parseISO } from 'date-fns';
import { createTransformerLink } from 'apollo-client-transform';

const DateTransformer = {
  parseValue(date: string) {
    return date ? parseISO(date) : null;
  },
};

const transformers = {
  User: { dob: DateTransformer },
};

const transformerLink = createTransformerLink(transformers as any);

const buildClient = (link: any) => {
  const enhancedHttpLink = transformerLink.concat(link);
  return new ApolloClient({
    link: enhancedHttpLink as any,
    cache: new InMemoryCache({
      // possibleTypes: introspectionToPossibleTypes(introspectionQueryResultData),
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      },
      mutate: {
        errorPolicy: 'ignore',
      },
    },
  });
};

export default buildClient;
