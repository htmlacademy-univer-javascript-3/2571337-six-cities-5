export function stringWithPluralRule(str: string, count: number) {
  return `${count} ${str + (count > 1 ? 's' : '')}`;
}
