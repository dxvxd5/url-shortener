import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, world');
});

console.log('youpi');

app.listen(port, () => {
  return null;
});
