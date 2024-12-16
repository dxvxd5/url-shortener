import { expect, test } from 'bun:test';

test('passing', () => {
  expect(2 + 2).toBe(4);
});

test('failing', () => {
  expect(2 + 2).toBe(5);
});
