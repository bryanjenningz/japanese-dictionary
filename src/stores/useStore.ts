import { useState, useEffect } from "react";

export const useStore = <T, F>(
  store: (selector: (state: T) => F) => F,
  selector: (state: T) => F
) => {
  const result = store(selector) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
