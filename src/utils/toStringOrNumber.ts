export function toStringOrNumber<T extends object> (obj: T, key: string, value: string | number) {
  return typeof obj[key as keyof T] === 'number' ? Number(value) : String(value);
}
