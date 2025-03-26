import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { cleanEnv, port, url } from 'envalid';
import express, { json } from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import path from 'path';

import { resolvers } from './graphql/resolvers';
import { capturePathAfterAuthority } from './middleware/capturePathAfterAuthority';
import { type UrlManager, getUrlFromAlias, urlManager } from './model';

export interface GraphQLServerContext {
  dataSources: {
    urlManager: UrlManager;
  };
}

const SCHEMA_PATH = path.resolve(__dirname, './graphql/schema.graphql');

const { SERVER_PORT, SERVER_ORIGIN } = cleanEnv(process.env, {
  SERVER_PORT: port(),
  SERVER_ORIGIN: url(),
});

const app = express();
app.use(json());
app.use(cors());
app.use(capturePathAfterAuthority);

const httpServer = createServer(app);

const apolloServer = new ApolloServer<GraphQLServerContext>({
  resolvers,
  typeDefs: readFileSync(path.resolve(__dirname, './graphql/schema.graphql'), {
    encoding: 'utf-8',
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await apolloServer.start();

app.use(
  '/graphql',
  expressMiddleware(apolloServer, {
    // eslint-disable-next-line @typescript-eslint/require-await
    context: async () => {
      return {
        dataSources: {
          urlManager: urlManager,
        },
      };
    },
  })
);

app.get('/schema', (req, res) => {
  res.sendFile(SCHEMA_PATH);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('*', async (req, res) => {
  // remove the leading slash
  const urlAlias = req.pathAfterAuthority && req.pathAfterAuthority.slice(1);

  if (!urlAlias) {
    res.status(400).send();
    return;
  }

  try {
    const url = await getUrlFromAlias(urlAlias);

    if (url) {
      res.redirect(url.baseUrl);
    }

    // TODO: Handle 404s more gracefully. Maybe redirect to a 404 page?
    res.status(404).send();
  } catch {
    res.status(500).send();
  }
});

httpServer.listen({ port: SERVER_PORT }).on('listening', () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 HTTP Server ready at ${SERVER_ORIGIN}:${SERVER_PORT}`);
  // eslint-disable-next-line no-console
  console.log(
    `🚀 Graphql Server ready at http://localhost:${SERVER_PORT}/graphql`
  );
});
