const { detectCardType } = require('../../src/utils/cardTypeDetector');

describe('detectCardType', () => {
  test('should detect Visa', () => {
    expect(detectCardType('4111 1111 1111 1111')).toBe('Visa');
  });

  test('should detect Mastercard', () => {
    expect(detectCardType('5555 5555 5555 4444')).toBe('Mastercard');
    expect(detectCardType('2221 0000 0000 0000')).toBe('Mastercard');
  });

  test('should detect Mir', () => {
    expect(detectCardType('2200 1234 5678 9012')).toBe('Mir');
  });

  test('should detect American Express', () => {
    expect(detectCardType('3411 111111 11111')).toBe('American Express');
  });

  test('should detect Discover', () => {
    expect(detectCardType('6011 0000 0000 0000')).toBe('Discover');
    expect(detectCardType('6500 0000 0000 0000')).toBe('Discover');
  });

  test('should detect JCB', () => {
    expect(detectCardType('3528 0000 0000 0000')).toBe('JCB');
  });

  test('should return null for unknown type', () => {
    expect(detectCardType('9999 9999 9999 9999')).toBeNull();
  });

  test('should return null for empty string', () => {
    expect(detectCardType('')).toBeNull();
  });
});