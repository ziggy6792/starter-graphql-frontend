/* eslint-disable no-underscore-dangle */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { parseISO } from 'date-fns';
import { createTransformerLink } from 'apollo-client-transform';
import { onError } from '@apollo/client/link/error';
import { store } from 'src/config/store';
import { setErrorsActionCreator, ErrorType } from 'src/domain/error';
import { ApolloLink } from 'apollo-link';

const DateTransformer = {
  parseValue(date: string) {
    return date ? parseISO(date) : null;
  },
};

const BaseEntityTransformers = { createdAt: DateTransformer, modifiedAt: DateTransformer };

const transformers = {
  Slot: { ...BaseEntityTransformers, startTime: DateTransformer },
  Booking: { ...BaseEntityTransformers },
  Clinic: { ...BaseEntityTransformers },
  Nurse: { ...BaseEntityTransformers },
};

const transformerLink = createTransformerLink(transformers as any);

const errorLink = onError((apolloError) => {
  const { graphQLErrors, networkError } = apolloError;
  const errors = [];

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => errors.push({ type: ErrorType.GRAPHQL_ERROR, displayText: `Error: ${message}` }));
  }

  const errorAsSting = (error: Error) => JSON.stringify({ message: error?.message, stack: error?.stack });

  if (networkError) {
    // eslint-disable-next-line no-console
    console.error('NETWORK_ERROR', networkError);
    if ('result' in networkError) {
      errors.push({
        type: ErrorType.NETWORK_ERROR,
        displayText: `ServerError: ${errorAsSting(networkError)} ${JSON.stringify({
          statusCode: networkError?.statusCode,
          response: networkError?.response,
          result: networkError?.result,
        })}`,
      });
    } else if ('bodyText' in networkError) {
      errors.push({
        type: ErrorType.NETWORK_ERROR,
        displayText: `ServerParseError: ${errorAsSting(networkError)} ${JSON.stringify({
          statusCode: networkError?.statusCode,
          response: networkError?.response,
          bodyText: networkError?.bodyText,
        })}`,
      });
    } else {
      errors.push({ type: ErrorType.NETWORK_ERROR, displayText: errorAsSting(networkError) });
    }
  }

  // ToDo: Accessing store outside of component. Maybe this is hacky
  store.dispatch(setErrorsActionCreator({ errors }));
});

const buildClient = (link: any) => {
  const enhancedHttpLink = transformerLink.concat(link);
  return new ApolloClient({
    link: errorLink.concat(enhancedHttpLink as any),
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
