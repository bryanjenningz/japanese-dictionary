import { useRef, useState } from "react";

type LongPressMenu =
  | { type: "CLOSED" }
  | { type: "PRESSED_DOWN" }
  | { type: "OPEN"; item: HTMLElement };

export const useLongPress = (onLongPress: () => void) => {
  const [menu, setMenu] = useState<LongPressMenu>({ type: "CLOSED" });
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>();

  const onTouchStart = () => {
    setMenu({ type: "PRESSED_DOWN" });
    timeoutId.current = setTimeout(onLongPress, 500);
  };

  const onTouchEnd = (item: HTMLElement) => {
    setMenu({ type: "OPEN", item });
    clearTimeout(timeoutId.current);
  };

  return { menu, onTouchStart, onTouchEnd };
};
