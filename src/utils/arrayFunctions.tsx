export const arrayEquals = (
  a: Array<string | number>,
  b: Array<string | number>
): boolean => {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}