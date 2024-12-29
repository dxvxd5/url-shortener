import { cleanEnv, num } from 'envalid';
import express, { json } from 'express';

const { SERVER_PORT } = cleanEnv(process.env, {
  SERVER_PORT: num(),
});

const app = express();
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(SERVER_PORT, () => {
  return null;
});
