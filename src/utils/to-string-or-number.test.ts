import { toStringOrNumber } from './to-string-or-number';
import { datatype } from 'faker';

describe('Test Function: toStringOrNumber', () => {
  it('should return value with number type with typeof obj[key] = number and string type arg value', () => {
    const obj = { key: 10 };
    const value = datatype.string();

    const result = toStringOrNumber(obj, 'key', value);

    expect(result).toBe(Number(value));
  });

  it('should return the same value with typeof obj[key] = number and number type arg value', () => {
    const obj = { key: 10 };
    const value = datatype.number();

    const result = toStringOrNumber(obj, 'key', value);

    expect(result).toBe(value);
  });

  it('should return the same value with typeof obj[key] = string and string type arg value', () => {
    const obj = { key: '10' };
    const value = datatype.string();

    const result = toStringOrNumber(obj, 'key', value);

    expect(result).toBe(value);
  });

  it('should return value with string type with typeof obj[key] = string and arg value with number type', () => {
    const obj = { key: '10' };
    const value = datatype.number();

    const result = toStringOrNumber(obj, 'key', value);

    expect(result).toBe(String(value));
  });
});
