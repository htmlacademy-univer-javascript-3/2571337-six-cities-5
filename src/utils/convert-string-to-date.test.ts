import { convertStringToDate } from './convert-string-to-date';

describe('Test function: convertStringToDate', () => {

  it('should return varriable with type Date', () => {
    const str = '2020-10-10';
    const result = convertStringToDate(str);
    expect(result instanceof Date).toBe(true);
  });

});
