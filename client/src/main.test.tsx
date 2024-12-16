// sum.js
export function sum(a: number, b: number) {
  return a + b;
}

test('failing', () => {
  expect(sum(1, 2)).toBe(4);
});
