const sum = (a: number, b: number) => {
  return a + b;
};

test('fails', () => {
  // expect(sum(1, 2)).toBe(4);
  expect(sum(1, 2)).toBe(3);
});
