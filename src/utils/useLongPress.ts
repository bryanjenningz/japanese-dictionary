import { useRef, useState } from "react";

type LongPressMenu<T> = { type: "CLOSED" } | { type: "OPEN"; target: T };

export type LongPress<T> = {
  menu: LongPressMenu<T>;
  closeMenu: () => void;
  onTouchStart: (target: T) => void;
  onTouchEnd: () => void;
};

export const useLongPress = <T>(): LongPress<T> => {
  const [menu, setMenu] = useState<LongPressMenu<T>>({ type: "CLOSED" });
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>();

  const onTouchStart = (target: T) => {
    timeoutId.current = setTimeout(
      () => setMenu({ type: "OPEN", target }),
      500
    );
  };

  const onTouchEnd = () => {
    clearTimeout(timeoutId.current);
  };

  const closeMenu = () => setMenu({ type: "CLOSED" });

  return { menu, closeMenu, onTouchStart, onTouchEnd };
};
