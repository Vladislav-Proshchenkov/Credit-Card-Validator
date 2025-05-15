const { validateCardNumber } = require('../../src/utils/cardValidator');

describe('validateCardNumber', () => {
  test('should return true for valid Visa card', () => {
    expect(validateCardNumber('4111 1111 1111 1111')).toBe(true);
  });

  test('should return true for valid Mastercard', () => {
    expect(validateCardNumber('5555 5555 5555 4444')).toBe(true);
  });

  test('should return true for valid Mir card', () => {
    expect(validateCardNumber('2200 0000 0000 0004')).toBe(true);
  });

  test('should return false for invalid card', () => {
    expect(validateCardNumber('4111 1111 1111 1112')).toBe(false);
  });

  test('should return false for non-digit characters', () => {
    expect(validateCardNumber('4111-1111-1111-1111')).toBe(true);
    expect(validateCardNumber('4111 1111 1111 111a')).toBe(false);
  });

  test('should return false for too short numbers', () => {
    expect(validateCardNumber('4111 1111 111')).toBe(false);
  });
});