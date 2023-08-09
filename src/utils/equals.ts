export const equals = <T>(a: T, b: T): boolean => {
  if (a === b) {
    return true;
  }
  if (
    typeof a !== typeof b ||
    typeof a === "number" ||
    typeof a === "boolean" ||
    typeof a === "string" ||
    typeof a === "symbol" ||
    typeof a === "bigint" ||
    typeof a === "function" ||
    a === undefined ||
    a === null
  ) {
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((_, i) => equals(a[i], b[i]));
  }
  if (typeof a === "object" && typeof b === "object" && b !== null) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    for (const key in a) {
      if (!equals(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
};
