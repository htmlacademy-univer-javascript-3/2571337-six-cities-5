export function capitalize(str: string) {
  return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
