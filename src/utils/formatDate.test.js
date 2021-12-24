import formatDate from './formatDate';

test('returns at least a string', () => {
  expect(typeof formatDate(Date.now())).toBe('string');
});
