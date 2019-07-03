import requestMethods from '../src/requestMethods';

test('requestMethods should have matching keys and values', () => {
  const keys = Object.keys(requestMethods);

  keys.forEach(key => {
    expect(key).toBe(requestMethods[key]);
  });
});
