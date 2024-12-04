import { sortByDate } from './sort-by-date';

describe('Test function: sortByDate', () => {

  it('should return sorted objects with dateString prop with strategy earlier - first', () => {
    const objects = [
      {
        date: '2019-05-08T14:13:56.569Z'
      },
      {
        date: '2019-05-08T12:13:56.569Z'
      },
      {
        date: '2019-05-08T18:13:56.569Z'
      },
      {
        date: '2019-05-10T14:13:56.569Z'
      },
    ];
    const expectedObjects = [
      {
        date: '2019-05-10T14:13:56.569Z'
      },
      {
        date: '2019-05-08T18:13:56.569Z'
      },
      {
        date: '2019-05-08T14:13:56.569Z'
      },
      {
        date: '2019-05-08T12:13:56.569Z'
      }
    ];
    const result = sortByDate(objects, 'date');
    expect(result).toEqual(expectedObjects);
  });

  it('should return the same objects with incorrect value stringDate field', () => {
    const objects = [
      {
        date: 'aaa'
      },
      {
        date: 'ccc'
      },
      {
        date: 'bbb'
      },
      {
        date: 'zzz'
      },
    ];
    const result = sortByDate(objects, 'date');
    expect(result).toEqual(objects);
  });

});
