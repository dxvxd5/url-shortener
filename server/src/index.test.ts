// sum.js
export function sum(a: number, b: number) {
  return a + b;
}

test('passing', () => {
  expect(sum(1, 2)).toBe(3);
});

test('failing', () => {
  expect(sum(1, 2)).toBe(4);
});
