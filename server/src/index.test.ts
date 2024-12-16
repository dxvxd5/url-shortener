// sum.js
export function sum(a: number, b: number): string {
  return a + b;
}

test('passing', () => {
  expect(sum(1, 2)).toBe(3);
});
