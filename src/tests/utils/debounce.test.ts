import {
  type Mock,
  describe,
  vitest,
  beforeEach,
  afterEach,
  it,
  expect,
} from "vitest";
import { debounce } from "~/utils/debounce";

describe("debounce", () => {
  let mockFn: Mock;
  let debouncedFn: (...args: unknown[]) => void;
  const delay = 500;

  beforeEach(() => {
    vitest.useFakeTimers();
    mockFn = vitest.fn();
    debouncedFn = debounce(mockFn, delay);
  });

  afterEach(() => {
    vitest.clearAllTimers();
    vitest.useRealTimers();
  });

  it("Debounces the function call", () => {
    debouncedFn();
    vitest.advanceTimersByTime(delay - 100);
    debouncedFn();
    vitest.advanceTimersByTime(100);
    expect(mockFn).not.toHaveBeenCalled();

    vitest.advanceTimersByTime(delay);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should debounce the function call with arguments", () => {
    const arg1 = "Hello";
    const arg2 = 42;

    debouncedFn(arg1, arg2);
    vitest.advanceTimersByTime(delay - 100);
    debouncedFn(arg1, arg2);
    vitest.advanceTimersByTime(100);
    expect(mockFn).not.toHaveBeenCalled();

    vitest.advanceTimersByTime(delay);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
  });
});
