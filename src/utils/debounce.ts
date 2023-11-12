export const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
): ((...args: T) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
