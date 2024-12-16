import express from 'express';

const app = express();
const port = 8080;

console.log('test');

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(port, () => {
  return null;
});
