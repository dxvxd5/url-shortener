import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, it is David!');
});

app.listen(port, () => {
  return null;
});
