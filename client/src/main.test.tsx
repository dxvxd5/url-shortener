export function sum(a: number, b: number) {
  return a + b;
}

test('passes', () => {
  expect(sum(1, 2)).toBe(3);
});
