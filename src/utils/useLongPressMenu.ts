import { useState } from "react";

type MenuState<T> = { type: "CLOSED" } | { type: "OPEN"; target: T };

export type LongPressMenu<T> = {
  menu: MenuState<T>;
  closeMenu: () => void;
  onLongPress: (target: T) => void;
};

export const useLongPressMenu = <T>(): LongPressMenu<T> => {
  const [menu, setMenu] = useState<MenuState<T>>({ type: "CLOSED" });
  const onLongPress = (target: T) => setMenu({ type: "OPEN", target });
  const closeMenu = () => setMenu({ type: "CLOSED" });
  return { menu, closeMenu, onLongPress };
};
