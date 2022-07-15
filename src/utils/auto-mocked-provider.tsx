import { buildClientSchema, printSchema } from 'graphql';
import introspection from 'src/generated/introspection.json';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema, IMocks } from '@graphql-tools/mock';
import { SchemaLink } from '@apollo/client/link/schema';
import { ApolloProvider } from '@apollo/client';
import buildClient from 'src/providers/build-client';
import faker from 'faker';

import React from 'react';

const defaultCustomResolvers = {
  ObjectId: () => {
    return faker.datatype.uuid();
  },
  Timecode: () => {
    return '00:00:00:00';
  },
  Clip: () => {
    return { startTimecode: '00:00:00:00', endTimecode: '00:00:12:08' };
  },
};

interface AutoMockedProviderProps {
  mockResolvers?: IMocks;
}

const AutoMockedProvider: React.FC<AutoMockedProviderProps> = ({ children, mockResolvers }) => {
  // 1) Convert JSON schema into Schema Definition Language
  const schemaSDL = printSchema(buildClientSchema({ __schema: introspection.__schema } as any));

  const baseSchema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
  });

  const schema = addMocksToSchema({
    schema: baseSchema,
    mocks: { ...defaultCustomResolvers, ...mockResolvers },
  });

  const client = buildClient(new SchemaLink({ schema }));

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AutoMockedProvider;
