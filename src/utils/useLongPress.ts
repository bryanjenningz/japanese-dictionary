import { useRef } from "react";

export const useLongPress = (onLongPress: () => void) => {
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>();

  const onTouchStart = () => {
    timeoutId.current = setTimeout(onLongPress, 500);
  };

  const onTouchEnd = () => {
    clearTimeout(timeoutId.current);
  };

  return { onTouchStart, onTouchEnd };
};
