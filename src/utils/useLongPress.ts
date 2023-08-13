import { useRef, useState } from "react";

type LongPressMenu = { type: "CLOSED" } | { type: "OPEN"; item: HTMLElement };

export const useLongPress = () => {
  const [menu, setMenu] = useState<LongPressMenu>({ type: "CLOSED" });
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>();

  const onTouchStart = (item: HTMLElement) => {
    timeoutId.current = setTimeout(() => setMenu({ type: "OPEN", item }), 500);
  };

  const onTouchEnd = () => {
    clearTimeout(timeoutId.current);
  };

  return { menu, onTouchStart, onTouchEnd };
};
