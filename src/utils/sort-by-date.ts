import { convertStringToDate } from './convert-string-to-date';

export function sortByDate<T, K extends keyof T>(data: T[], keyDate: K) {
  return data
    .slice().sort(
      (prev, next) =>
        convertStringToDate(String(next[keyDate])).getTime() - convertStringToDate(String(prev[keyDate])).getTime()
    );
}
