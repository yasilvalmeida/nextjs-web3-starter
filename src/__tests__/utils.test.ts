import {
  cn,
  formatAddress,
  formatBalance,
  isValidAddress,
  isValidAmount,
} from '../lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe(
        'text-red-500 bg-blue-500'
      );
    });

    it('should handle conditional classes', () => {
      expect(cn('base-class', true && 'conditional-class')).toBe(
        'base-class conditional-class'
      );
      expect(cn('base-class', false && 'conditional-class')).toBe('base-class');
    });
  });

  describe('formatAddress', () => {
    it('should format address correctly', () => {
      const address = '0x1234567890123456789012345678901234567890';
      expect(formatAddress(address)).toBe('0x1234...7890');
    });

    it('should handle custom character count', () => {
      const address = '0x1234567890123456789012345678901234567890';
      expect(formatAddress(address, 6)).toBe('0x123456...567890');
    });
  });

  describe('formatBalance', () => {
    it('should format balance correctly', () => {
      expect(formatBalance('1.23456789')).toBe('1.2346');
      expect(formatBalance('0')).toBe('0');
      expect(formatBalance('0.000001')).toBe('< 0.0001');
    });

    it('should handle custom decimal places', () => {
      expect(formatBalance('1.23456789', 2)).toBe('1.23');
    });
  });

  describe('isValidAddress', () => {
    it('should validate Ethereum addresses correctly', () => {
      expect(isValidAddress('0x1234567890123456789012345678901234567890')).toBe(
        true
      );
      expect(isValidAddress('0x123456789012345678901234567890123456789')).toBe(
        false
      ); // too short
      expect(isValidAddress('1234567890123456789012345678901234567890')).toBe(
        false
      ); // no 0x prefix
      expect(isValidAddress('0xGGGG567890123456789012345678901234567890')).toBe(
        false
      ); // invalid hex
    });
  });

  describe('isValidAmount', () => {
    it('should validate amounts correctly', () => {
      expect(isValidAmount('1')).toBe(true);
      expect(isValidAmount('0.1')).toBe(true);
      expect(isValidAmount('0')).toBe(false);
      expect(isValidAmount('-1')).toBe(false);
      expect(isValidAmount('abc')).toBe(false);
    });
  });
});
