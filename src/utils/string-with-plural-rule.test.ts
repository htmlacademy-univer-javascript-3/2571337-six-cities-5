import { stringWithPluralRule } from './string-with-plural-rule';
import { datatype } from 'faker';

describe('Test function: stringWithPluralRule', () => {

  it('should return string with plural s with arg count > 1', () => {
    const count = datatype.number({ min:2 });
    const str = 'comment';
    const expectedStr = `${count} comments`;

    const result = stringWithPluralRule(str, count);

    expect(result).toBe(expectedStr);
  });

  it('should return string without plural s with arg count < 1', () => {
    const count = datatype.number({ max: 1 });
    const str = 'comment';
    const expectedStr = `${count} comment`;

    const result = stringWithPluralRule(str, count);

    expect(result).toBe(expectedStr);
  });

});
