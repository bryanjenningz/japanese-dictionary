export const classNames = (...args: (string | false)[]): string => {
  return args.filter(Boolean).join(" ");
};
