/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ApolloProvider, createHttpLink } from '@apollo/client';
import buildClient from './build-client';

const client = buildClient(createHttpLink({ uri: 'http://localhost:4000/graphql' }));

const ApiProvider: React.FC = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default ApiProvider;
