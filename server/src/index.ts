import express from 'express';
import pluginJs from '@eslint/js';

console.log('is it working');

function unsafeExample() {
  return 'unsafe'; // This should trigger an error if returned without proper typing.
}

const button = document.querySelector('button');
button?.addEventListener('click', async () => {
  // Mistakenly passing an async function directly to an event handler
  await fetch('/api');
});

async function example() {
  Promise.resolve('value'); // This should trigger an error because the promise is not awaited.
}

const item = new Object();
const s = '5';

const age: number = 30;

if (s == '5') {
  console.log(age);
}

const name = `Capt. Janeway`;

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return null;
});
