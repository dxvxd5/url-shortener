import { GraphQLScalarType, Kind } from 'graphql';

import { Url } from '../model';
import type { Resolvers } from './generated/graphql';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

// TODO: Improve URL alias generation algorithm (hashing, etc.)
const generateAlias = () => {
  return Math.random().toString(36).substring(7);
};

export const resolvers: Resolvers = {
  Date: dateScalar,
  Mutation: {
    shortenUrl: async (_, { url }, { dataSources }) => {
      // TODO: Check if short alias already exists
      return await dataSources.urlManager.create(
        new Url({
          baseUrl: url,
          shortUrl: generateAlias(),
          createdAt: new Date(),
          lastAccessedAt: new Date(),
        })
      );
    },
  },
};
