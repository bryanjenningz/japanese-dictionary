import { useState } from "react";

type LongPressMenu<T> = { type: "CLOSED" } | { type: "OPEN"; target: T };

export type LongPress<T> = {
  menu: LongPressMenu<T>;
  closeMenu: () => void;
  onLongPress: (target: T) => void;
};

export const useLongPress = <T>(): LongPress<T> => {
  const [menu, setMenu] = useState<LongPressMenu<T>>({ type: "CLOSED" });
  const onLongPress = (target: T) => setMenu({ type: "OPEN", target });
  const closeMenu = () => setMenu({ type: "CLOSED" });
  return { menu, closeMenu, onLongPress };
};
