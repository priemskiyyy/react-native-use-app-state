import { isFunction } from './isFunction';

describe('isFunction', () => {
  it('should return true for a function', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function test() {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function* generator() {})).toBe(true);
  });

  it('should return false for non-function values', () => {
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(42)).toBe(false);
    expect(isFunction('string')).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(true)).toBe(false);
  });
});
