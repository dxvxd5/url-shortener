import { config as dotenvConfig } from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

// Load environment variables from .env file
dotenvConfig();

const config: CodegenConfig = {
  schema: `http://${process.env.VITE_API_SERVER_HOST}/${process.env.VITE_API_GRAPHQL_PATH}`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
