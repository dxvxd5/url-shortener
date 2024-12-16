export function sum(a: number, b: number) {
  return a + b;
}

test('passes', () => {
  expect(sum(1, 2)).toBe(3);
});

test('fails', () => {
  // expect(sum(1, 2)).toBe(4);
  expect(sum(1, 2)).toBe(4);
});
