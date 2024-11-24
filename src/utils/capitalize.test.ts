import { capitalize } from './capitalize';

describe('Test function: capitalize', () => {

  it('should return the same capitalized str]', () => {
    const str = 'ноль';
    const expectedStr = 'Ноль';
    const result = capitalize(str);
    expect(result).toBe(expectedStr);
  });

  it('should return empty string with empty string]', () => {
    const str = '';
    const expectedStr = '';
    const result = capitalize(str);
    expect(result).toBe(expectedStr);
  });
});
