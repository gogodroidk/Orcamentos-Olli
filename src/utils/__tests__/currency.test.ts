import { describe, expect, it } from 'vitest';
import { parseCurrency } from '../currency';

describe('parseCurrency', () => {
  it.each([
    ['12,50', 12.5],
    ['1.234,56', 1234.56],
    ['R$ 1.234,56', 1234.56],
    ['1234.56', 1234.56],
    ['', 0],
  ])('converte %s para %s', (input, expected) => {
    expect(parseCurrency(input)).toBe(expected);
  });
});
