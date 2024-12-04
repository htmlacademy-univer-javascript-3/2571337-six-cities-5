export function convertToStringOrNumber<
  K extends string | number,
  T extends Record<K, unknown>
>(obj: T, key: K, value: string | number) {
  return typeof obj[key] === 'number' ? Number(value) : String(value);
}
