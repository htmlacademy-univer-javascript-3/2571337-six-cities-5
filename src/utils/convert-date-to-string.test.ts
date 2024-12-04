import { convertDateToString } from './convert-date-to-string';

describe('Test function: convertDateToString', () => {

  it('should return current date in format MMMM YYYY with incorrect dateString and format = [MMMMYYYY]', () => {
    const str = '';
    const expectedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
    const result = convertDateToString(str, 'MMMMYYYY');
    expect(result).toBe(expectedDate);
  });

  it('should return current date in format YYYY-MM-DD with incorrect dateString and format = [YYYYMMDD]', () => {
    const str = '';
    const expectedDate = new Date().toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    const result = convertDateToString(str, 'YYYYMMDD');
    expect(result).toBe(expectedDate);
  });

  it('should return date in format MMMM YYYY with correct stringDate format yyyy-mm-dd  and format = [MMMMYYYY]', () => {
    const str = '2019-05-08T14:13:56.569Z';
    const expectedDate = new Date('2019-05-08').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
    const result = convertDateToString(str, 'MMMMYYYY');
    expect(result).toBe(expectedDate);
  });

  it('should return date in format YYYY-MM-DD with correct stringDate format yyyy-mm-dd  and format = [YYYYMMDD]', () => {
    const str = '2019-05-08T14:13:56.569Z';
    const expectedDate = new Date('2019-05-08').toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    const result = convertDateToString(str, 'YYYYMMDD');
    expect(result).toBe(expectedDate);
  });

});
